const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'resumegeniusai_db',
    port: 3307 
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

app.get('/',(req,res)=>{
    return res.json('from backend side');
})

// Create new resume
app.post('/user-resumes', (req, res) => {
    const { title, resumeId, userEmail, userName } = req.body.data;
    const documentId = uuidv4();

    const query = 'INSERT INTO resumes (document_id, title, resume_id, user_email, user_name) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [documentId, title, resumeId, userEmail, userName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Get user resume by email
app.get('/user-resumes', (req, res) => {
    const userEmail = req.query.userEmail;
    const query = 'SELECT * FROM resumes WHERE user_email = ?';
    db.query(query, [userEmail], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ data: results });  // Modified response to match expected format in frontend
    });
});


// Insert data into information table
app.post('/user-information', (req, res) => {
    const { documentId, first_name, last_name, job_title, address, phone, email } = req.body.data;

    const query = `
        INSERT INTO information (document_id, first_name, last_name, job_title, address, phone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [documentId, first_name, last_name, job_title, address, phone, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId });
    });
});

app.get('/user-information/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    const query = 'SELECT * FROM information WHERE document_id = ?';
    db.query(query, [documentId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No information found' });
        }
        res.status(200).json(results[0]);  // Return the first result directly
    });
});


// Update resume details based on document_id
app.put('/user-resumes/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    const { first_name, last_name, job_title, address, phone, email } = req.body.data;

    const query = `
        UPDATE information 
        SET first_name = ?, last_name = ?, job_title = ?, address = ?, phone = ?, email = ?
        WHERE document_id = ?
    `;
    db.query(query, [first_name, last_name, job_title, address, phone, email, documentId], (err, result) => {
        if (err) {
            console.error('Error updating resume:', err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Resume updated successfully' });
    });
});

// add summery 
app.post('/user-summary', (req, res) => {
    const { documentId, summary } = req.body.data;

    const query = 'INSERT INTO summery (document_id, summery, create_at) VALUES (?, ?, NOW())';
    db.query(query, [documentId, summary], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Fetch summary by document_id
app.get('/user-summary/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    
    const query = 'SELECT * FROM summery WHERE document_id = ?';
    db.query(query, [documentId], (err, result) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Summary not found" });
        }
        res.status(200).json(result[0]);
    });
});


app.put('/user-summaryupdate/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    const { summary } = req.body.data;

    const query = `
        UPDATE summery 
        SET summery = ?
        WHERE document_id = ?
    `;
    db.query(query, [summary, documentId], (err, result) => {
        if (err) {
            console.error('Error updating resume:', err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Resume updated successfully' });
    });
});

// insert user Experience 
app.post('/user-experience', (req, res) => {

    console.log('Received data:', req.body.data);
    const { documentId, company, position, city, state, start_date, end_date, responsibilities } = req.body.data;

    const query = `
        INSERT INTO experience (document_id, company, position, city, state, start_date, end_date, responsibilities)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [documentId, company, position, city, state, start_date, end_date, responsibilities], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Fetch experience by document_id
app.get('/user-experience/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    const query = 'SELECT * FROM experience WHERE document_id = ?';
    db.query(query, [documentId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No experience found' });
        }
        res.status(200).json({ data: results });  // Return results as array
    });
});

// Update experience details based on exp_id and document_id
app.put('/user-experience/:id', (req, res) => {
    const id = req.params.id;
    const { document_id, company, position, city, state, start_date, end_date, responsibilities } = req.body.data;

    if (!document_id || !id) {
        return res.status(400).json({ error: "Missing document_id or exp_id" });
    }

    const query = `
        UPDATE experience 
        SET company = ?, position = ?, city = ?, state = ?, start_date = ?, end_date = ?, responsibilities = ?, update_on = CURRENT_TIMESTAMP()
        WHERE exp_id = ? AND document_id = ?
    `;
    db.query(query, [company, position, city, state, start_date, end_date, responsibilities, id, document_id], (err, result) => {
        if (err) {
            console.error('Error updating experience:', err);
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Experience updated successfully' });
    });
});



app.listen(8088, ()=>{
    console.log('server is running');
})
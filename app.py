from flask import Flask, render_template, request, redirect, jsonify
from flask_mysqldb import MySQL
import os

app = Flask(__name__)

# MySQL Database Configuration
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "users_db"
mysql = MySQL(app)

# Upload folder path
UPLOAD_FOLDER = os.path.join('static', 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        message = request.form['message']
        file = request.files['file']

        # Check if the required fields are empty
        if not username:
            return '<h1 style="color:red; text-align:center; margin-top:300px;">Error: Username is required</h1>'
        elif not email:
            return '<h1 style="color:red; text-align:center; margin-top:300px;">Error: Email is required</h1>'
        elif not message:
            return '<h1 style="color:red; text-align:center; margin-top:300px;">Error: Message is required</h1>'
        elif not file:
            return '<h1 style="color:red; text-align:center; margin-top:300px;">Error: File is required</h1>'

        # Check if the email already exists in the database
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users1 WHERE email = %s", (email,))
        existing_user = cur.fetchone()

        if existing_user:
            cur.close()
            return '<h1 style="color:red; text-align:center; margin-top:300px;">Error: Email already exists. Please choose another email</h1>'

        # Save file to the server
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Insert into the database (now with timestamp)
        cur.execute("INSERT INTO users1 (name, email, image, message) VALUES (%s, %s, %s, %s)",
                    (username, email, file.filename, message))
        mysql.connection.commit()
        cur.close()

        # Automatically refresh the page or redirect to '/folder' after 2 seconds
        return '''
            <script type="text/javascript">
                setTimeout(function(){
                    window.location.href = "/folder";
                }, 2000);  // 2-second delay
            </script>
            <h1 style="color:green; text-align:center; margin-top:300px;">Success! Redirecting...</h1>
        '''

    return render_template('upload.html')

@app.route('/folder')
def folder():
    cur = mysql.connection.cursor()
    # Fetch data in reverse order (LIFO order)
    cur.execute("SELECT * FROM users1 ORDER BY created_at DESC")
    userDetails = []
    if cur.rowcount > 0:
        userDetails = cur.fetchall()
    cur.close()
    return render_template('folder.html', userDetails=userDetails)

if __name__ == '__main__':
    app.run(debug=True)

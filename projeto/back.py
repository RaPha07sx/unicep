from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# Configuração da conexão com o banco de dados MySQL
db = mysql.connector.connect(
    host="localhost",
    user="seu_usuario",
    password="sua_senha",
    database="seu_banco_de_dados"
)

cursor = db.cursor()

@app.route('/')
def index():
    return render_template('index.html')  # página HTML com seu formulário

@app.route('/add_comment', methods=['POST'])
def add_comment():
    nome = request.form['name']
    comentario = request.form['comment']

    # Insere o comentário no banco de dados
    sql = "INSERT INTO comentarios (nome, comentario) VALUES (%s, %s)"
    val = (nome, comentario)
    cursor.execute(sql, val)
    db.commit()

    return jsonify({"message": "Comentário adicionado com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/get_comments', methods=['GET'])
def get_comments():
    cursor.execute("SELECT nome, comentario, data FROM comentarios ORDER BY data DESC")
    comentarios = cursor.fetchall()
    return jsonify(comentarios)

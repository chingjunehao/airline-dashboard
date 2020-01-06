from flask import Flask, render_template


application = Flask(__name__, template_folder="light-bootstrap-dashboard-master/BS3", static_folder="light-bootstrap-dashboard-master/BS3/assets")

@application.route('/')
def dashboard():
	return render_template('campagin.html')

if __name__ == '__main__':
	application.run(debug=True, port=5001)
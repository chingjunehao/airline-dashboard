from flask import Flask, render_template


application = Flask(__name__, template_folder="light-bootstrap-dashboard-master/BS3", static_folder="light-bootstrap-dashboard-master/BS3/assets")

@application.route('/')
def dashboard():
	return render_template('campagin.html')

@application.route('/campaign')
def campaign():
	return render_template('campagin.html')

@application.route('/sentiment')
def sentiment():
	return render_template('sentiment.html')

@application.route('/sna')
def sna():
	return render_template('sna.html')

if __name__ == '__main__':
	application.run(debug=True, port=5001)
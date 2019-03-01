# ourapp/forms.py

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class NameHandicapForm(FlaskForm):
    playername = StringField('name', validators=[DataRequired()])
    handicap = StringField('hc', validators=[DataRequired()])
    handicapdec = StringField('hcdec', validators=[DataRequired()])

class TeamSizeForm(FlaskForm):
    teamsize = StringField('teamsize', validators=[DataRequired()])

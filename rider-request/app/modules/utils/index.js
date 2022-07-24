import * as nodemailer from 'nodemailer';
import firebaseAdmin from 'firebase-admin';
// const account_sid = process.env.TWILIO_ACCOUNT_SID;
// const auth_token = process.env.TWILIO_AUTH_TOKEN;

// const Client = require('twilio')(account_sid, auth_token);

export const distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
export const makeCall = (to, from, session_id) => {

    //     client = Client(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])
    //     print("## Making a call")
    //     resp = VoiceResponse()
    //     to_id = request.values['To']
    //     from_id = request.values['From']
    //     session_id = request.values['SessionID']  # name we use to uniquely identify conference 
    // client = Client.calls.create()

    //    # creates the call from the from_id to the to_id, adding the to_id to the conference
    //     call = client.calls.create(from_ = "client:" + from_id, to = "client:" + to_id,
    //         url = app.config['MY_URL']'/joinConf/' + str(session_id),
    //         status_callback_event = ['completed'],
    //         status_callback = app.config['MY_URL'] + '/completeCall/' + str(session_id))
    //    # updates global dictionary to handle edge case where caller leaves before callee picks up
    //     global sessionID_to_callsid
    //     sessionID_to_callsid[session_id] = call.sid

    //    # dials the caller(from_id) into the conference
    //     dial = Dial()
    //     dial.conference(session_id,
    //         waitUrl = 'https://twimlets.com/holdmusic?Bucket=my-static-music',
    //         status_callback = app.config['MY_URL'] + '/leave',
    //         status_callback_event = "leave join")
    //     resp.append(dial)
}
export const sentEmail = async (receiverEmail, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject,
        headers: {
            "X-Laziness-level": 1000,
            "charset": 'UTF-8'
        },
        html
    };

    await transporter.sendMail(mailOptions);
}

export const pushNotification = async (tokens, title, description) => {
    firebaseAdmin.messaging().sendToDevice(tokens, { notification: { title, body: description }}).then(response => {
        response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                console.error('Failure sending notification to', error);
            } else {
                console.log('Sucessfully sent Notification to', result);
            }
        });
    })
}
import dbConnect from '../utils/dbConnect.js'
import User from '../../../models/User'

export default async function handler(req, res) {
    await dbConnect()
    try {
        User.find( {}, { albums: 1 },
            function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.send(result[0].albums);
                }
            })
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}
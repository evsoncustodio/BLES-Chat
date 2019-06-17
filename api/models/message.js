module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        text: {
            type: 'String',
            trim: true,
            maxlength: 512,
        },
        user: {
            type: 'ObjectId',
            ref: 'User'
        }
    });

    return mongoose.model('Message', schema);
}
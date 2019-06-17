module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        name: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true
        },
        profilePicture: {
            type: 'ObjectId',
            ref: 'File'
        }
    });

    return mongoose.model('User', schema);
}
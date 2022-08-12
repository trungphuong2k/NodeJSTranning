const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://phuongtt:52ENJ6d17s982jM5@cluster0.zfaso.mongodb.net/?retryWrites=true&w=majority',
    () => {},
);
export default mongoose;

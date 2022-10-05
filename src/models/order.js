const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    items: [{
        quotation: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://jr-bookinglet-2.s3.ap-southeast-2.amazonaws.com/github/canva.jpg",
        },
        design: {
            designName: {
                type: String,
                required: true,
            },
            tileColor: [{
                location: {
                    type: String,
                    required: true,
                },
                color: {
                    type: String,
                    required: true,
                },
            }],
            courtSize: {
                name: {
                    type: String,
                    required: true,
                },
                length: {
                    type: Number,
                    required: true,
                },
                width: {
                    type: Number,
                    required: true,
                },
                centreCircleRadius: Number,
                threePointRadius: Number,
                threePointLine: Number,
                lengthOfCorner: Number,
                restrictedAreaLength: Number,
                restrictedAreaWidth: Number,
                sideBorderWidth: Number,
                lineBorderWidth: Number,
            },
        },
        quotationDetails: [{
            color: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }],
    }],

    userInfo: {
        email: {
            type: String
        },
        phone: {
            type: String
        },
        shippingAddress: {
            city: {
                type: String
            },
            country: {
                type: String
            },
            line1: {
                type: String
            },
            line2: {
                type: String
            },
            postal_code: {
                type: String
            },
            state: {
                type: String
            }
        },
        billingAddress: {
            city: {
                type: String
            },
            country: {
                type: String
            },
            line1: {
                type: String
            },
            line2: {
                type: String
            },
            postal_code: {
                type: String
            },
            state: {
                type: String
            }
        }

    },

    currency: {
        type: String
    },

    totalPrice: {
        type: Number
    },

    sessionId: {
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },

},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('Order', schema);
module.exports = Model;
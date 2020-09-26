'use strict';

import { Schema, model, Types } from 'mongoose';
import { IProduct } from './IProduct';
import moment from 'moment';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    pricePublic: {
        type: Number,
        default: 0
    },
    taxes: [
        {
            type: Types.ObjectId,
            ref: 'Tax'
        }
    ],
    measurementUnitId: {
        type: Types.ObjectId,
        ref: 'MeasurementUnit',
        default: null
    },
    createdAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    },
    updatedAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    }
},
{
    versionKey: false
});

const Product = model<IProduct>('Product', ProductSchema);

export { Product };
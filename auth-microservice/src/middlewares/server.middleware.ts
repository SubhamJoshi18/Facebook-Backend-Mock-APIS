import express from 'express'
import { Application } from "express";
import morgan from 'morgan'



function initalizeServerMiddleware( app : Application ){
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(morgan('dev'))
}


export default initalizeServerMiddleware
import { response } from "express";
import dataModel from "../models/dataModels.js";
import { where } from "sequelize";
import Jadwal from "../models/noteModels.js";

// Get data by id
export async function getDataById(req, res) {
    try {
        const response = await dataModel.findOne({
            attributes: ["hotel", "RNO", "ARR", "RNA", "RR", "OCC"],
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

// Mendapatkan semua data
export async function getData(req, res) {
    try {
        const response = await dataModel.findAll({
            attributes: [
                "id",
                "hotel",
                "RNO",
                "ARR",
                "RNA",
                "RR",
                "OCC",
                "createdAt",
            ],
        });

        res.status(200).json(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

// Menambahkan data
export async function addData(req, res) {
    const { title, deskripsi, date, staf } = req.body;
    try {
        await Jadwal.create({
            title : title,
            deskripsi : deskripsi,
            date : date,
            staf : staf
        });
        res.status(201).json({ msg: "Data berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: "internal error" });
    }
}


// Delete data
export async function deleteData(req, res) {
    const data = await dataModel.findOne({
        attributes: ["id", "hotel", "RNO", "ARR", "RNA"],
        where: {
            id: req.params.id,
        },
    });
    if (!data) return res.status(404).json({ msg: "Data tidak ditemukan!" });
    try {
        await dataModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

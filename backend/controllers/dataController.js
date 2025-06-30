import { response } from "express";
import dataModel from "../models/dataModels.js";
import { where } from "sequelize";


// Get data by id
export async function getDataById(req, res) {
    try {
        const response = await dataModel.findOne({
            attributes: ["hotel", "RNO", "ARR", "RNA", "RR", "OCC"],
            where : {
                id : req.params.id
            }
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
            attributes: ["id" ,"hotel", "RNO", "ARR", "RNA", "RR", "OCC", "createdAt"],
        });
        
        res.status(200).json(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

// Menambahkan data
export async function addData(req, res) {
    const { hotel, RNO, ARR, RNA } = req.body;
    const jumlahRR = RNO * ARR;
    const jumlahOCC = (RNO / RNA) * 100
    try {
        await dataModel.create({
            hotel: hotel,
            RNO: RNO,
            ARR: ARR,
            RNA: RNA,
            RR: jumlahRR,
            OCC: jumlahOCC
        });
        res.status(201).json({ msg: "Data berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: "internal error" });
    }
}

// Update data
export async function updateData(req, res) {
    const data = await dataModel.findOne({
        attributes: ["id", "hotel", "RNO", "ARR", "RNA", "RR"],
        where: {
            id: req.params.id,
        },
    });

    if (!data) return res.status(404).json({ msg: "Data tidak ditemukan!" });

    const { hotel, RNO, ARR, RNA } = req.body;

    const hitungRR = RNO * ARR
     const jumlahOCC = (RNO / RNA) * 100;
    // Proses update data
    try {
        await data.update(
            {
                hotel,
                RNO,
                ARR,
                RNA,
                RR : hitungRR,
                OCC : jumlahOCC
            },
            {
                where: {
                    id: data.id,
                },
            }
        );
        res.status(200).json({ msg: "Data berhasil dirubah!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
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

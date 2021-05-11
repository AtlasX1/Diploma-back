const Substance = require("../models/substance");
const Disease = require("../models/disease");
const Symptom = require("../models/symptom");
const FeatureUse = require("../models/featureUse");
const Feature = require("../models/feature");
const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const reqData = req.body;
    if (reqData) {
      const {
        name,
        description,
        disease,
        contraindicationDrug,
        contraindicationHuman,
        specificsOfPatients,
      } = reqData;

      const newSubstance = {
        name: name,
        description: description,
        disease: [],
        contraindicationDrug: contraindicationDrug,
        contraindicationHuman: [],
        specificsOfPatients: [],
      };

      for (const item of disease) {
        const newDisease = new Disease({
          name: item.name,
          symptoms: item.symptoms.map((s) => {
            const newSymptom = new Symptom({ name: s });
            newSymptom.save();
            return newSymptom;
          }),
        });
        newDisease.save();
        newSubstance.disease.push(newDisease);
      }

      newSubstance.contraindicationHuman = contraindicationHuman.map((f) => {
        const newFeature = new Feature({ name: f });
        newFeature.save();
        return newFeature;
      });

      newSubstance.specificsOfPatients = specificsOfPatients.map(
        ({ name, description }) => {
          const newFeature = new Feature({ name });
          newFeature.save();
          const newFeatureUse = new FeatureUse({
            feature: newFeature,
            description,
          });
          newFeatureUse.save();
          return newFeatureUse;
        }
      );
      console.log(newSubstance);

      const resultSubstance = new Substance({ ...newSubstance });
      resultSubstance.save();
      res.status(200).json({ message: "success" });
    } else {
      return res.status(402).json({ message: "Body is undefined" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", async (req, res) => {
  try {
    const drugs = await Substance.find()
      .populate({
        path: "disease",
        populate: { path: "symptoms", select: "name -_id" },
        select: "name -_id",
      })
      .populate({
        path: "specificsOfPatients",
        select: "description -_id",
        populate: { path: "feature", select: "name -_id" },
      })
      .populate({
        path: "contraindicationHuman",
        select: "name description -_id",
      });
    if (!drugs) {
      return res
        .status(400)
        .json({ message: "Substance not found, try again" });
    }
    return res.status(200).json({ drugs, message: "success" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

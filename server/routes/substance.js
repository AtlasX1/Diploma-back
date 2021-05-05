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
        featureUse,
      } = reqData;

      const newSubstance = {
        name,
        description: description ?? "",
        disease: [],
        contraindicationDrug: contraindicationDrug ?? [],
        contraindicationHuman: [],
        featureUse: [],
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

      newSubstance.featureUse = featureUse.map(({ name, description }) => {
        const newFeature = new Feature({ name });
        newFeature.save();
        const newFeatureUse = new FeatureUse({
          feature: newFeature,
          description,
        });
        newFeatureUse.save();
        return newFeatureUse;
      });

      const resultSubstance = new Substance({ ...newSubstance });
      resultSubstance.save();
      res.status(200).json({ message: "Ok!" });
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
    const drugs = await Substance.find();
    if (!drugs) {
      return res
        .status(400)
        .json({ message: "Substance not found, try again" });
    }
    return res.status(200).json({ drugs });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

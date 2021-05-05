const router = require("express").Router();
const Substance = require("../models/substance");
const Disease = require("../models/disease");
const Symptom = require("../models/symptom");
const FeatureUse = require("../models/featureUse");
const Feature = require("../models/feature");
const substance = require("../models/substance");

router.get("/getInfo", async (req, res) => {
  try {
    const reqDataQuery = req.query;
    const reqDataBody = req.body;
    if (reqDataQuery || reqDataBody) {
      const { disease } = reqDataQuery;
      const { symptoms } = reqDataBody;

      const allSubstance = await Substance.find()
        .populate({
          path: "disease",
          populate: { path: "symptoms", select: "name -_id" },
          select: "name -_id",
        })
        .populate({
          path: "featureUse",
          select: "description -_id",
          populate: { path: "feature", select: "name -_id" },
        })
        .populate({
          path: "contraindicationHuman",
          select: "name description -_id",
        });

      let result = null;
      let resultSymptom = {};
      if (disease) {
        result = allSubstance.filter((substance) =>
          substance.disease.some((dis) => dis.name === disease)
        );
      }
      if ((!result || result.length === 0) && symptoms?.length > 0) {
        let tmpResult = {};
        for (const symptomName of symptoms) {
          resultSymptom[symptomName] = allSubstance
            .filter((substance) =>
              substance.disease.some((dis) =>
                dis.symptoms.some((sym) => sym.name === symptomName)
              )
            )
            .map((el) => el.name);
        }

        for (const symptomName of Object.keys(resultSymptom)) {
          for (const diseaseName of resultSymptom[symptomName]) {
            if (!tmpResult[diseaseName]) {
              tmpResult[diseaseName] = [symptomName];
            } else {
              tmpResult[diseaseName].push(symptomName);
            }
          }
        }
        console.log(tmpResult);
      }
      return res.status(200).json({ ...allSubstance });
    }

    return res.status(200).json({ message: "Ok!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

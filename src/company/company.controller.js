import companyModel from "./company.model.js";

export const companyPOST = async (req, res) => {
    const { name, nivelImpacto, experiencia, category } = req.body;
    const company = new companyModel({ name, nivelImpacto, experiencia, category });

    await company.save();
    res.status(200).json({
        company,
    });
};


/*

const companyDelete = async (req, res) => {
    const { id } = req.params;
    await Company.findByIdAndUpdate(id, { estado: false });

    const company = await Company.findOne({ _id: id });
    res.status(200).json({
        msg: "Compañia eliminada",
        company,
    })
};


const companyPut = async (req, res) => {
    const { id } = req.params;
    const { companyId, correo, password, ...resto } = req.body;
    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({ _id: id });

    res.status(200).json({
        msg: "compania actualizada",
        company,
    });
};

const getCompany = async (req, res = response) => {
  const query = { estado: true };

  const [total, companies] = await Promise.all([
    Company.countDocuments(query),
    Company.find(query),
  ]);

  res.status(200).json({
    total,
    companies,
  });
};


const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findOne({ _id: id })

    res.status(200).json({
        company,
    });
};


*/


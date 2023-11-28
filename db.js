const { Sequelize, DataTypes } = require("sequelize");

// Inisialisasi koneksi ke database SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./test.db",
});

// Definisikan model untuk tabel 'suplier'
const Suplier = sequelize.define(
  "suplier",
  {
    id_suplier: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_suplier: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "suplier",
    timestamps: false,
  }
);

// Definisikan model untuk tabel 'produk'
const Produk = sequelize.define(
  "produk",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    suplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Suplier,
        key: "id_suplier",
      },
    },
  },
  {
    tableName: "produk",
    timestamps: false,
  }
);

// Membuat asosiasi antara 'Produk' dan 'Suplier'
Produk.belongsTo(Suplier, { foreignKey: "suplier_id", as: "suplier" });
Suplier.hasMany(Produk, { foreignKey: "suplier_id", as: "produk" });

// Fungsi untuk melakukan sinkronisasi model dengan database
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  initDb,
  Produk,
  Suplier,
};

initDb();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    adresse: { type: String, required: true },
    experienceProfessionnelle: { type: String, required: true },
    motivation: { type: String, required: true },
    photo: { type: String } 
}, {
    timestamps: true
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.motDePasse);
};

// Hachage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
    if (!this.isModified('motDePasse')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

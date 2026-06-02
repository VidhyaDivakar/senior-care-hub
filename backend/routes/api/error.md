```
userSchema.pre("save", asyncfunction (next) {    if (!this.isModified("password")) {        return next();    }    const salt = await bcrypt.genSalt(10);    this.password = await bcrypt.hash(this.password, salt);    next();});
```

Error - Next is not a function

removed next from the async function as it is not supported by Express

# Scrypta Shamir Backup 

This tool is intended to be used to create secure backups for Scrypta Wallets. It can easily be used to create any kind of secret sharing by the way this is not the main use.

If you want to install it you have to do it globally with: 

```
npm install -g @scrypta/shamir
```

After you've installed it you can easily use with these two commands: 

```
scrypta-shamir create
```

Will create a prompt interface where you'll choose the number of total shares and the number of minimum shares (threshold) to restore your wallet.

You can even choose a password to encrypt the data (and you will need it again to restore the wallet)

Use instead this command to restore a wallet:

```
scrypta-shamir restore --path=/PATH/TO/FOLDER/BACKUP 
```

If you've encrypted the data you need to use the tool as follows: 

```
scrypta-shamir restore --path=/PATH/TO/FOLDER/BACKUP --password=YourStrongPassword
```
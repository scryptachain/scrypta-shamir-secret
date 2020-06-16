# Scrypta Shamir Backup 

This tool is intended to be used to create secure backups for Scrypta Wallets. It can easily be used to create any kind of secret sharing by the way this is not the main use.

If you want to install it you have to do it globally with: 

```
npm install -g @scrypta/shamir
```

## Create a brand new wallet

If you want to create a new Lyra wallet you can use this command:

```
scrypta-shamir create
```

This command will create an interface where you choose the number of total shares and the number of minimum shares (threshold) to restore your wallet.

You can even choose a password to encrypt the data (and you will need it again to restore the wallet)

## Secure random data

If you want to secure your own data you can use this command :

```
scrypta-shamir secure
```

This will work as the `create` command but you've to enter a string to backup. You always can choose a password to encrypt the data.

## Restore a backup

Use instead this command to restore a backup:

```
scrypta-shamir restore --path=/PATH/TO/FOLDER/BACKUP 
```

If you've encrypted the data you need to use the tool as follows: 

```
scrypta-shamir restore --path=/PATH/TO/FOLDER/BACKUP --password=YourStrongPassword
```
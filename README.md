# Scrypta Shamir Backup 

<p><a href="https://camo.githubusercontent.com/4e892209b4b1e2d1a773ec97e544a92f068a6f0b/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f333136382f312a31674778414b57714b5135577a635170755f766932412e6a706567" target="_blank" rel="noopener noreferrer"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://camo.githubusercontent.com/4e892209b4b1e2d1a773ec97e544a92f068a6f0b/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f333136382f312a31674778414b57714b5135577a635170755f766932412e6a706567" alt="" data-canonical-src="https://miro.medium.com/max/3168/1*1gGxAKWqKQ5WzcQpu_vi2A.jpeg" /></a></p>


This tool is intended to be used to create secure backups for Scrypta Wallets. It can easily be used to create any kind of secret sharing by the way this is not the main use.

<p style="text-align: center;"><a title="English &mdash; Scrypta Wiki" href="https://en.scrypta.wiki/utilities/shamir-backup.html" target="_blank" rel="nofollow noopener"><strong>Wiki English</strong></a>&nbsp;&middot; &middot; &middot;&nbsp;<a title="Italiano &mdash; Scrypta Wiki" href="https://it.scrypta.wiki/utilities/shamir-backup.html" target="_blank" rel="nofollow noopener"><strong>Wiki italiano</strong></a></p>

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

#!/bin/sh

# Go to domain directory.
cd $DOCROOT

echo "Linking modules from $ZENCI_DEPLOY_DIR"
ln -s $ZENCI_DEPLOY_DIR/* ./

#!/bin/sh

# cleanup & update links

cd $ZENCI_DEPLOY_DIR

echo "Update vuejs"
node pre-deploy.js

if [ "$ROOTDIR" != "" ];then
  echo "Replacing root: $ROOTDIR"
  sed -i 's|root:.*$|root: '$ROOTDIR'|g' _config.yml
fi

echo "Replacing URL: $DOMAIN"
sed -i 's|url:.*$|url: https://'$DOMAIN'|g' _config.yml

echo "Replacing public_dir: $DOCROOT"
sed -i 's|public_dir:.*$|public_dir: '$DOCROOT'|g' _config.yml


node ./node_modules/.bin/hexo clean
node ./node_modules/.bin/hexo generate

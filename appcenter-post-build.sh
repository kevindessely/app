#!/usr/bin/env bash

COMMIT_MESSAGE=$(git log -1 HEAD --pretty=format:%s)
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

ARCHIVE_DIR="$APPCENTER_OUTPUT_DIRECTORY/archive/Staging.xcarchive/Products/Applications/Hedvig.app"

echo "**************** PUBLISH CHANGES WITH CODEPUSH ******************"
echo "$APPCENTER_OUTPUT_DIRECTORY"
echo "$ARCHIVE_DIR"

appcenter codepush release -a "$APP_CENTER_APP_NAME" -c "$ARCHIVE_DIR" --description "$COMMIT_MESSAGE" -d "$CODE_PUSH_DEPLOYMENT_NAME" -t "$PACKAGE_VERSION" --token "$APP_CENTER_TOKEN"
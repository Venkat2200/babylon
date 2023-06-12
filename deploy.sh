branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

echo $branch

serversProd=(atvp1xwamp136.dmz.unix atvp1xwamp137.dmz.unix atvp1xwamp138.dmz.unix)
serverDev="atvd1xwamp134.dmz.unix"

if [ "$branch" == "main" ]; then
  for server in "${serversProd[@]}"
  do
    rsync -r dist/* "$server":/data/www/sites/promo/PROJECT_NAME/ --delete
  done
elif [ "$branch" == "development" ]; then
  ssh $serverDev mkdir -p /data/www/sites/promo/PROJECT_NAME/
  scp -r dist/* "$serverDev":/data/www/sites/promo/PROJECT_NAME/
else
  echo "!!!Not supported branch!!!"
fi

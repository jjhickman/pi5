#!/bin/bash
for filename in /data/backup; do
    if ! [[ "lsof -t ${filename} | wc -w" ]]
    then
        echo "Backing up ${filename}."
        mv filename ${NAS_URL}/filename
    fi
done

for filename in /data/logs; do
    if ! [[ "lsof -t ${filename} | wc -w" ]]
    then

        echo "Backing up ${filename} log."
        mv filename ${NAS_URL}/filename
    fi
done

echo "Done"
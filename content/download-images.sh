#!/usr/bin/env bash

handleLine() {
	line=`sed -e 's/<a\s*[^>]*>//g' <<< $1`
	line2=`sed -e 's/<\/a>//g' <<< $line`
	echo $line2 >> cleaned.txt
	# filename=`jq -r '.media.main_image.filename' <<< $line2`
	# wget -q -P ./images/ "http://img.wennermedia.com/1200-width/$filename"
}

while read line
do
    handleLine "$line"
done < rolling.txt

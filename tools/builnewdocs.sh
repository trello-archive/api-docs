#!/bin/bash
rm -r /super/workspace/trello/trellodocs/app/templates/docs
rsync -avz /super/workspace/trello/server/docs/_build/html/api/ /super/workspace/trello/trellodocs/app/templates/docs/
cd /super/workspace/trello/trellodocs/app/templates/docs
for i in *;do mv $i/index.html "$i.html";done
rmdir */
for i in *.html
do
	sed -i '1,68d' $i
	head -n -47 $i > $i.tmp
	mv $i.tmp $i
	sed -i 's/¶//g' $i
	echo "working on $i"
done
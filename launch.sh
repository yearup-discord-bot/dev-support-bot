#!/bin/bash

function main()
{
	if [ "$?" != 0 ]; then
		git checkout HEAD~1
		main
	fi
}

main

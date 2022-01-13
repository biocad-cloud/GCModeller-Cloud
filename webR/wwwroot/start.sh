########!/bin/bash

# infinite loop
while true
do
	echo "Press CTRL+C to stop the script execution"
	
	docker run -it -v "$PWD:/opt/biocad/" -p 8847:80 dotnet:gcmodeller_v5.23.2 Rserve --start --port 7452 --Rweb "/opt/biocad/" --show_error --n_threads 8
done

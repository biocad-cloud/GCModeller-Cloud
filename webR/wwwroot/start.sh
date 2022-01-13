########!/bin/bash

# infinite loop
while true
do
	echo "Press CTRL+C to stop the script execution"
	
	docker run -it -v "$PWD:/opt/biocad/" -w "/opt/biocad/" -p 8847:80 dotnet:gcmodeller_v5.23.2 Rserve --start --port 80 --Rweb "/opt/biocad/" --show_error --n_threads 2
done

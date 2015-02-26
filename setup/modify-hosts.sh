#!/bin/bash
SUCCESS=0                      # All good programmers use Constants
domain=$1            # Change this to meet your needs
needle=$domain             # Fortunately padding & comments are ignored
hostline="127.0.0.1 $domain"
filename=/etc/hosts

# Determine if the line already exists in /etc/hosts
echo "Calling Grep"
grep -q "$needle" "$filename"  # -q is for quiet. Shhh...

# Grep's return error code can then be checked. No error=success
if [ $? -eq $SUCCESS ]
then
  echo "$needle found in $filename"
else
  echo "$needle not found in $filename"
  # If the line wasn't found, add it using an echo append >>
  sudo bash -c "echo \"$hostline\" >> \"$filename\""
  echo "$hostline added to $filename"
fi
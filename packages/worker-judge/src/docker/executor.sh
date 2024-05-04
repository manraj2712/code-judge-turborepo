#!/bin/bash

# Assuming the filename is passed as an argument
file=$1

# Get file extension
ext="${file##*.}"

# Setup build directory path
build_dir="/app/build"

# Ensure build directory exists
mkdir -p $build_dir

# Execute based on file extension
case $ext in
  "cpp")
    # Compile C++ code and place the executable in the build directory
    g++ $file -o $build_dir/output && $build_dir/output
    ;;
  "java")
    # Compile Java code and store .class files in the build directory
    javac -d $build_dir $file && java -cp $build_dir ${file%.*}
    ;;
  "js")
    # Execute JavaScript file using Node.js
    node $file
    ;;
  *)
    echo "Unsupported file type"
    exit 1
    ;;
esac

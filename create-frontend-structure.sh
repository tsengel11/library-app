#!/bin/bash

# Define the root directory for your frontend project
rootDir="frontend"

# Create the root directory
mkdir -p "$rootDir"

# Define subdirectories
srcDir="$rootDir/src"
appDir="$srcDir/app"
assetsDir="$srcDir/assets"
environmentsDir="$srcDir/environments"
componentsDir="$appDir/components"
servicesDir="$appDir/services"
guardsDir="$appDir/guards"
modelsDir="$appDir/models"

# Create an array of directories to create
dirsToCreate=(
    "$srcDir"
    "$appDir"
    "$assetsDir"
    "$environmentsDir"
    "$componentsDir"
    "$componentsDir/login"
    "$componentsDir/user-registration"
    "$componentsDir/book-list"
    "$componentsDir/borrow-book-dialog"
    "$componentsDir/return-book-dialog"
    "$componentsDir/category-management"
    "$servicesDir"
    "$guardsDir"
    "$modelsDir"
)

# Create directories
for dir in "${dirsToCreate[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo "Created directory: $dir"
    else
        echo "Directory already exists: $dir"
    fi
done

# Create placeholder files in the src directory
srcFiles=(
    "$srcDir/index.html"
    "$srcDir/main.ts"
    "$srcDir/styles.scss"
    "$rootDir/angular.json"
    "$rootDir/package.json"
    "$rootDir/tsconfig.json"
)

for file in "${srcFiles[@]}"; do
    if [ ! -f "$file" ]; then
        touch "$file"
        echo "Created file: $file"
    else
        echo "File already exists: $file"
    fi
done

# Create environment files
envFiles=(
    "$environmentsDir/environment.ts"
    "$environmentsDir/environment.prod.ts"
)

for file in "${envFiles[@]}"; do
    if [ ! -f "$file" ]; then
        touch "$file"
        echo "Created file: $file"
    else
        echo "File already exists: $file"
    fi
done

# Create app module and routing module files
appFiles=(
    "$appDir/app.module.ts"
    "$appDir/app-routing.module.ts"
)

for file in "${appFiles[@]}"; do
    if [ ! -f "$file" ]; then
        touch "$file"
        echo "Created file: $file"
    else
        echo "File already exists: $file"
    fi
done

# Create component files
components=(
    "login"
    "user-registration"
    "book-list"
    "borrow-book-dialog"
    "return-book-dialog"
    "category-management"
)

for component in "${components[@]}"; do
    componentDir="$componentsDir/$component"
    componentFiles=(
        "$componentDir/$component.component.ts"
        "$componentDir/$component.component.html"
        "$componentDir/$component.component.css"
        "$componentDir/$component.component.spec.ts"
    )
    for file in "${componentFiles[@]}"; do
        if [ ! -f "$file" ]; then
            touch "$file"
            echo "Created file: $file"
        else
            echo "File already exists: $file"
        fi
    done
done

# Create service files
services=(
    "auth.service.ts"
    "user.service.ts"
    "book.service.ts"
    "borrow.service.ts"
    "category.service.ts"
)

for service in "${services[@]}"; do
    serviceFile="$servicesDir/$service"
    if [ ! -f "$serviceFile" ]; then
        touch "$serviceFile"
        echo "Created file: $serviceFile"
    else
        echo "File already exists: $serviceFile"
    fi
done

# Create guard files
guards=(
    "auth.guard.ts"
    "staff.guard.ts"
)

for guard in "${guards[@]}"; do
    guardFile="$guardsDir/$guard"
    if [ ! -f "$guardFile" ]; then
        touch "$guardFile"
        echo "Created file: $guardFile"
    else
        echo "File already exists: $guardFile"
    fi
done

# Create model files
models=(
    "user.model.ts"
    "book.model.ts"
    "borrow.model.ts"
    "category.model.ts"
)

for model in "${models[@]}"; do
    modelFile="$modelsDir/$model"
    if [ ! -f "$modelFile" ]; then
        touch "$modelFile"
        echo "Created file: $modelFile"
    else
        echo "File already exists: $modelFile"
    fi
done
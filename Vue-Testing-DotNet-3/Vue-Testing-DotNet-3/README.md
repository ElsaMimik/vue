# README

### ENV
please install the following items to build the environment:

1. visual studio 2017
2. open powershell with aministrator account then exexute buildenv.ps1. if execute fail, please install the following items manually 
    2.1. [chocolatey](https://chocolatey.org/install)
    ```cmd
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```
    2.2. [dot net framework 4.7.1 dev pack](https://www.microsoft.com/en-us/download/details.aspx?id=56119)

    2.3. nodejs v9.3.1
    2.4. nodejs module: webpack
        ```cmd
        npm install webpack -g
        ```
    2.5. nodejs module: webpack-dev-server
        ```cmd
        npm install webpack-dev-server -g
        ```
    2.6. initial node modules in project folder
        ```cmd
        npm install
        ```

### PROJECT
1. vue-resource can not find in nuget, referernce and add manually
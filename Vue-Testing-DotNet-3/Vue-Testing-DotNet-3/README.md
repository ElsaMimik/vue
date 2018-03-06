# README

template suggestion as followings...

## ENV

please install the following items to build the environment:

1. visual studio 2017

2. please install the following items manually

    2.1. [chocolatey](https://chocolatey.org/install)

        Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

    2.2. [dot net framework 4.7.1 dev pack](https://www.microsoft.com/en-us/download/details.aspx?id=56119)

    2.3. nodejs v9.3.0

    2.4. nodejs module: webpack

        npm install webpack -g

    2.5. nodejs module: webpack-dev-server

        npm install webpack-dev-server -g

    2.6. initial node modules in project folder

        npm install

    2.7. [TypeScript 2.6 SDK](https://www.microsoft.com/en-us/download/details.aspx?id=55258)

    2.8. [SpecFlow for Visual Studio 2017](https://marketplace.visualstudio.com/items?itemName=TechTalkSpecFlowTeam.SpecFlowforVisualStudio2017)

3. [vue snippets](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.VuejsPack-18329) -- options

## PROJECT

1. avoid TypeScript some debug warnning in vs2017, add in csproj file -- [link](http://bodiddlie.github.io/ng-2-quickstart-vs2015/)

        <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
            <TypeScriptExperimentalDecorators>true</TypeScriptExperimentalDecorators>
            <TypeScriptModuleResolution>NodeJs</TypeScriptModuleResolution>
        </PropertyGroup>

2. TypeScript include global node_modules like 'axios' must add following in tsconfig.json -- [link](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

        "compilerOptions": {
            "types": [ "axios" ]
        }

3. TypeScript disable generate js in visual studio -- [link](https://stackoverflow.com/questions/40667665/how-to-prevent-visual-studio-2017-from-build-javascript)

    3.1. In csproj file

        <PropertyGroup>
            <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
        </PropertyGroup>

    3.2. Make sure you are including your typescript files as content

        <ItemGroup>
            <Content Include="[path][name].ts" />
        </ItemGroup>

    3.3. Add a tsconfig.json file to your project root and make sure the following setting is set:

        "compileOnSave": false

4. webpack config ignore Moment locale file

        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]

5. global jQuery in Vue for use signalr

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'root.jQuery': 'jquery'
            })
        ]

6. to use jQuery and singalr in Vue and TypeScript -- [link](https://dotblogs.com.tw/kinanson/2017/08/17/120457)

    6.1. install node packages

        npm install jquery signalr --save
        npm install @types/jquery --save-dev
        npm install @types/signalr --save-dev

    6.2. then import in ts or vue file

        import 'signalr'

        let hub = $.hubConnection(document.location.protocol + '//' + document.location.host);
        let proxy = hub.createHubProxy('MemberHub');

        proxy.on('newNotify', (data) => {
            listingComponent.search();
            console.log('receive message from signalr hub MemberHub-newNotify...');
        });

        hub.start().done(() => {
            proxy.invoke('joinGroup', 'member-room');
            console.log('signalr connect success...');
        });

7. before deployment, please make sure the size of bundled javascript in properly range, you can change devTool setting to check -- [link](https://webpack.js.org/configuration/devtool/)

8. "vue-property-decorator" is Typescript package for Vue Component implement -- [link](https://github.com/kaorun343/vue-property-decorator)

    8.1. install command

        npm install vue-class-component --save
        npm install vue-property-decorator --save

    8.2. tsconfig.json

        "compilerOptions": {
            "experimentalDecorators": true
        }

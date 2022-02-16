## @avanda/cli

@avanda/cli is the cli module of avandajs, it's required to run any avandajs project

## Installation
you can add @avanda/cli to your avandajs using npm
```bash
$ npm i @avanda/cli -g
```
or yarn

```bash
$ yarn global add @avanda/cli 
```

## usage

it's recommended to use avanda in project scope, to let yarn run avanda, 
add avanda to list of commands in your package.json then run: 

### local installation
For project scope
```bash
$ yarn avanda
```

### global scope

When avanda cli is installed globally, you don't need to add it to your, you can just run:

```bash
$ avanda -h
```
or 

```bash
$ avanda create model
```

or

```bash
$ avanda init <project-name>
```

command above will create a database model usable in your avanda project

#### NOTE:
Avanda CLI only works with avandajs project



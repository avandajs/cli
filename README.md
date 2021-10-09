## @avanda/cli

@avanda/cli is the cli module of avandajs, it's required to run any avandajs project

## Installation
you can add @avanda/cli to your avandajs using npm
```bash
$ npm i @index.ts/cli
```
or yarn

```bash
$ yarn add @index.ts/cli
```

## usage

it's recommended to use avanda in project scope, to let yarn run avanda, 
add avanda to list of commands in your package.json then run: 

### local installation
For project scope
```bash
$ yarn index.ts
```

### global scope

When avanda cli is installed globally, you don't need to add it to your, you can just run:

```bash
$ index.ts -h
```
or 

```bash
$ index.ts create model
```

command above will create a database model usable in your avanda project

#### NOTE:
Avanda CLI only works with avandajs project



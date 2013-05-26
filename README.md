
## Concept

XX aims to let you quickly write awesome looking documentation for you project. It is a compilation of the best practices found in different project documentation over the web.

XX is a base website based on Node/Express that you can tweak to your needs. It provides some basic utilities for parsing and combining static documentation files into a nice UI.


## Get started

Three small steps to get it running:

```
git clone XXX my-documentation-website
cd my-documentation-website
npm install
node app.js
```

Then go to `http://localhost:3000/` and see the base template. It's time to customize it to your needs


## Brand it

Depending on your project's documentation, you may need different levels of organization. Maybe you need a simple on-page documentation or a more structured documentation with pages.

### Edit the layout






## Write the documentation

In the folder 

### List sections

The easiest way is to provide an array of array. The first argument is the file name to be loaded from the directory, the second is the title you want to give it. The title is used only for the generated menu.

```
[
    ['intro'        , 'Introduction']
  , ['dependencies' , 'Dependencies']
  , ['usage'        , 'Usage']
]
```

### List sub-sections

If you want to render some files as sub-sections, you can list them as a third argument, following the same syntax as their parent section.

```
[
    ['intro'        , 'Introduction']
  , ['dependencies' , 'Dependencies']
  , ['usage'        , 'Usage'         , [
        ['basic'        , 'Basic']
      , ['advanced'     , 'Advanced']
    ]]
]
```

Sub-sections can also be listed from the template.

### Group items

If you want to group items and set a title, wrap the list in an object that defines a title attribute:

```
[
    {
        title: "Description",
        children: [
            ['intro', 'Introduction']
          , ['dependencies', 'Dependencies']
          , ['usage', 'Usage']
        ]
    },
    {
        title: "API"
      , children: [
            ['method1', 'Method 1']
          , ['method2', 'Method 2']
          , ['method3', 'Method 3']
      ]
    }
    
]
```
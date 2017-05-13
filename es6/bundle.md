# Let's begin?

![GIF](../gifs/source.gif)

# Wanna contribute? follow the template

- What will be printed...
- Result:
- But what? why?
- Some references

# setTimeout mysteries, var and lets!

## What will be printed by each of the following code? 

    for (var x = 0; x < 10; x++) {
      setTimeout(function () {
          console.log(x);
      });
    }

    for (let x = 0; x < 10; x++) {
      setTimeout(function () {
          console.log(x);
      });
    } 

## Return:

    10
    10
    10
    10
    10
    10
    10
    10
    10
    10

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9

## But what? why?

Most browsers have a minimum delay that is more then 0, so putting 0 as delay means: Put this task in the basket as soon as possible. If you don't pass the delay parameter to the *setTimeout* function, it means that it won't necessarily run right away, neither will explicitly setting the delay to 0. The reason is that *setTimeout* removes the function from the execution queue and it will only be invoked after JavaScript has finished with the current execution queue.

When you use a *let* variable in the *for* loop, it means that this variable is not acessible before it was declared in their enclosing block. A variable declared as *let* are block scoped variables. So it means that it only exists inside the *for* loop block. But when you use *var* instead, it means that the variable is scoped to the nearest function block, its not the case if you were using *let*, where it would be scoped to the nearest enclosing block. **But both are global if OUTSIDE any block!**

    let me = 'go';   // globally scoped
    var i = 'able';  // globally scoped

However, global variables defined as *let* will not be added as properties on the global *window* object like those defined as *var*:

    console.log(window.me);  // undefined
    console.log(window.i);   // 'able'

They are identical when used like this in a function block:

    function doSomething() {
        let stuff = 'awesome!';  // function block scoped
        var otherStuff = 'go!';  // function block scoped
    }

### Block
Here is the diference: *let* is only visible in the *for* loop and *var* is visible to the whole function:

    function someFunction() {
        // counter is NOT visible out here

        for(let counter = 0; counter < 5; counter++) {
            // counter is only visible in here (and in the for() parentheses)
            // and there is a separate counter variable for each iteration of the loop
        }

        // counter is NOT visible out here
    }

    function anotherFunction() {
        // counter IS visible out here

        for(var counter = 0; counter < 5; counter++) {
            // counter is visible to the whole function
        }

        // counter IS visible out here
    }

### Redeclaration
Assuming [strict mode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode), *var* will let you re-declare the same variable in the same scope. On the other hand, *let* will not:
    
        'use strict';
        let me = 'foo';
        let me = 'bar'; // SyntaxError: Identifier 'me' has already been declared

        'use strict';
        var me = 'foo';
        var me = 'bar'; // No problem, `me` is replaced.

### Some benefits of *let* variables are:
* Less risk of overriding some global variable used for something else.
* Less risk of memory leaks due to variables staying in memory long after they have become irrelevant (in the *for* loop example you can see that if you declare a *let* variable inside the *for*, when the *for* completes the execution, the *let* variable will be irrelevant and will be discarded, freeing memory, avoiding leaks!).

# Scopes, lets and vars

## What will be printed?

    var ar = 1;
    let et = 1;

    {
        var ar = 2;
        let et = 2;
        console.log("var", ar === 2);
        console.log("let", et === 2);
    }

    console.log("var", ar === 2);
    console.log("let", et === 2);

## Return:

    var true
    let true
    var true
    let false

## But what? why?

So, basically, the first *console.log* will first ask for the value of the *ar* variable inside this enclosing block of code. As you can see, the variable *ar* was declared as *var* so it means that its scoped to the nearest function block, in our case, its the global (outside any function) and, it can be also acessed before it was declared. So as we can observe, we have another declaration of the variable *ar* and as it was declared as *var* it will override the current value of the variable *ar* that is *1*, holding the value *2* now. 

### Lets imagine a conversation
**console.log (actually it will be the engine) says:** "Hey code block, do you know about the value of *ar*?"; **code block says:** "Fore sure! his value is 2!". Then moving on to the next *console.log* statement, **console.log says:** "Dude, can you tell the value of *et*?"; **code block says:** "Yep! its 2!". As you can see in this example, we are using a *let* variable, it was not overwritten! because this *let* can only exists inside this enclosing block (this is how it works). Moving on... outside this code block, **console.log says:** "Hey code block, me again, whats the value of this *ar*?"; **code block says:** "Alright, it was overwritten by some other code, it was *1* but now its *2*!". Moving on.. we reached our last *console.log* statement! **console.log says:** "Just one more time, what's the value of *et*?"; **code block says:** "Its *1*!". And you know why, right? this *let* variable belongs to the nearest enclosing block and it means that it belongs to the global scope and it will not be overwritten inside some other code block.

# The hoisting mechanics

## What will be printed?

    var a = 1;
    console.log("var", a === 1);
    console.log(func());
    
    function func() {
      return "hello";
    }
    
    console.log(func2());
    
    var func2 = function() {
      return "hello";
    }

## Return:
    var true
    hello
    TypeError: func2 is not a function

## But what? why?

### Chicken Or The Egg?

There's a temptation to think that all of the code you see in a JavaScript program is interpreted line-by-line, top-down in order, as the program executes. While this is substantially true, there's one part of the assumption which can lead to incorrect thinking about your program.

Consider this code:

    a = 2;
    var a;
    console.log(a);

What do you expect to be printed in the *console.log* statement?

Many developers would expect *undefined*, since the *var a* statement comes after *a = 2*, and it would seem natural to assume that the variable is re-defined and thus assigned the default *undefined* value. However, the output will be *2*. 

Consider another example:

    console.log(a);
    var a = 2;

You might be tempted to assume that, since the previous snippet exhibited some less-than-top-down looking behavior, perhaps in this snippet, *2* will also be printed. Others may think that since *a* variable is used before it is declared, this must result in a *ReferenceError* being thrown.

Unfortunatly, both guesses are incorrect. *undefined* is the output. 

    var a;
    console.log(a);
    a = 2;

As we can see now how the things were "moved", the declarations went straight to the top and the assignments left in place, this way *console.log* gets a *undefined* value, since the variable was declared but assigned right after the *console.log* statement.

### Hoisting

In JavaScript we have something called hoising! One way of thinking, metaphorically, about this process, is that variable and function decalarations are "moved" from where they appear in the flow of the code to the TOP of the code. This gives rise to the name "Hoisting". In other words, **the egg (declaration) comes before the chicken (assignment)**.

    function func() {
      return "hello";
    }

    var a;
    var func2;
    a = 1;
    console.log("var", a === 1);
    console.log(func());
    
    console.log(func2());
    
    func2 = function() {
      return "hello";
    }

## Double check the results showed above but using the new version of the code "how the things are executed with the eyes of the compiler", now its easy, right?

<sub>This example was took from the **You Don't Know JS** book by Kyle Simpson available for free on GitHub! Check it out [here!](https://github.com/getify/You-Dont-Know-JS)</sub>

# Recursion & memory stack + function mysteries!

## What will be printed?

    var func3 = function funcN(param) {
      return param > 1 ? "o" + funcN(param - 1) : "h";
    }

    console.log(func3(4));
    console.log(funcN(3));

## Result:

    oooh
    ReferenceError: funcN is not defined

## But what? why?

This is a very simple [Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) with a [Ternary Operator](https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) being used to compare if the parameter is greater than *1*, causing the function to return the string value *"o"* plus a call to the same function passing the same parameter minus 1, but if its not greater than *1*, it will just return a simple string *"h"*.

Following the execution of this code we can see that the *console.log* statement receives a function call as a parameter (its going to return some value to be printed), so this function *func3* is called with the value *4* as parameter. It will reach the ternary operator with a condition that is *param > 1* and, it would be true since *4 > 1*. The value *"o"* will be returned from this function with a call to the same function (recursion) but passing the value *param - 1* that would be *3*. **When we use recursion, each return will be pushed into the memory stack until we reach some stopping condition (in our case its when param is less than *1*, returning just a simple string value, and when we reach this point, all the returns will be popped from the memory stack and reduced to one value.**. Continuing the execution: the condition again, now with our new param value *3 > 1*, it will return the string value *"o"* plus the function call with a new parameter *3 - 1*. Again, the condition! *2 > 1* and, this time it will result in another return with *"o"* plus the function call with the new parameter *2 - 1*. Finally we reach our last condition *1 > 1* round and, this will be false of course, causing the return to be the string *"h"* without another function call and, thats our stopping condition. **As you remember, all those string returns will be popped from the memory stack and reduced (aggrouped, summed) into one value that is "oooh"**.

And why the *ReferenceError*? the function *funcN* was not declared, this function was created as a value of the variable *func3*. In JavaScript, if you give a name to this function (in the case of a function as a value), you can call it INSIDE, JUST INSIDE the function (recursion). It is not visible outside the function. Its like "letrec" in Lisp. Cool isnt it?

<sub>This last part of the explanation was tooked form [StackOverflow](http://stackoverflow.com/questions/3883780/javascript-recursive-anonymous-function).</sub>

# What will be printed?

    for (var i = 0; i < 10; i++) { }
    console.log(i);

    for (let iL = 0; iL < 10; iL++) { }
    console.log(iL);

## Return:

    10
    ReferenceError: iL is not defined

## But what? why?

Look at the body of those *for* loops. Nothing in there right? So lets follow the execution: The *for* loop will be executed and the global variable (global because theres no kind of scope embracing those *for* loops) *var i* at the end will have the value *10* as the *for* will execute until the *i* variable reaches 10. Next, the *console.log* statement will be called and it will print 10. Again, another empty *for* but this time with a *let* variable that only exists in the enclosing scope (in this case, inside the *for* loop). Whats going to be printed on this next *console.log* statement right after the *for*? yes, you right, a big ass reference error because it doesnt exist in the global scope! it was declared with *let* inside a *for* loop!

# hmm.. lets see more let and hoisting!

## What will be printed?

    console.log(i);
    var i = 9;

    console.log(iL);
    let iL = 10;

## Result:

    undefined
    ReferenceError: iL is not defined

## But what? why?

Well, lets see this code with the eyes of the compiler:

    var i;
    console.log(i);
    i = 9;

    console.log(iL);
    let iL = 10;

As you can see, when the first *console.log* statement is called, the variale *i* have no value yet, it was decalred and initialized but assinged too late, causing the return of the value *undefined*. But wait a minute, why the *let* variable was not "Hoisted" moved to the top as the *var* was? In ECMAScript 2015, *let* will hoist the variable declaration to the top of the block, BUT NOT the initialization. Contrary to declaring a variable with *var*, which hoists both declaration and initialization, referencing the variable in the block before the initialization results in a *ReferenceError*. The variable is in a "temporal dead zone" from the start of the block until the initialization is processed. So it means that the *console.log* statement will execute and the variable *iL* was not initialized yet, causing *ReferenceError* to occur.

Take care when using *let*! you wanna a exemple?

    function test() {
    var foo = 33;
      if (true) {
        let foo = (foo + 55); // ReferenceError: foo is not defined
      }
    }
    test();

Due to lexical scoping, the identifier "foo" inside the expression (foo + 55) evaluates to the if block's foo, and not the overlying variable foo with the value of 33. In that very line, the if block's "foo" has already been defined and hoisted, but has not yet reached (and terminated) its declaration statement (which is the statement itself): it's still in the temporal dead zone.

<sub>About the hoisting stuff with *lets*, i found it on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).</sub>

# Some pitfalls without our friend, strict mode

## What will be printed?

    var a1 = 1;

    {
      const a1 = 2;
      console.log(a1);

      {
        let a1 = 3;
        console.log(a1);
      }
    }
    console.log(a1);

## Result:

    2
    3
    1

## But what? why?

We can see that we have 3 levels of scope here. The global is the first (the one without some curly braces involving it in a hug), the second with the *const* variable inside it and another one inside this one with a *let* variable inside it. We have 3 variables with the same name but declared in different scopes. In this case, as we have the *console.log* statments being called in each different scope, it returns what we expect it to return. But its good to remember that if the variable *a1* inside the innermost scope was a simple *var* but not declared inside this scope, it would pop up onde scope and find the *const* variable in which has a value of 2 and would try to assign again a constant variable causing a *Uncaught TypeError* or if it wasnt a *const* it would change the value. Or maybe, if we didnt have the *a1* declared on this secondary scope, it would pop up to the global scope and it would find the global *a1* and it would override it. Or maybe we were not caring about [strict mode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode) and we didnt have the global variable declared, what you think would happen? the compiler would create it for us, from out of nowhere, like dark magic. Awesome right? nope.

# IIFEs and fabulous truth behind an expression

## What will be printed?

    (function() {
      var a = b = 1;
    })();
    console.log(b);

    function ab() {
      var aAB = bAB = 3;
    };

    ab();
    console.log(bAB);
    console.log(aAB);

## Return:

    1
    3
    ReferenceError: aAB is not defined

## But what? why?

As you can see, the first function looks weird. Its just a function that doesnt have a name and its being executed right before its declaration. *[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined*.

Okay, lets understand why we didnt get a big add *ReferenceError* when the *console.log* statement was called with the paramter *b*, thats is a variable that was SEEMS NOT declared in this scope. 

The thing is, when the IFFE function is called, the expression that will be executed inside of it is:

    var a = b = 1;

and in fact is interpreted like:

    var a = (b = 1);

which equals to:

    b = 1; // Woops! b was not declared inside this function!
    var a = 1;

which assigs the value *1* to a variable *b* that was not declared in this scope (function) and defines a local variable *a*. Whats going to happen is that the engine (something that will execute your code) will look for the reference of *b* to assign the value *1* to it. And guess what? the engine will ask the scope of the function and will discover that it was not declared there. So the engine will pop up one level (reaching the global scope) and since we are not using [strict mode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode), the engine will ask the global scope for the reference of *b* and the compiler will create the variable for the engine, yes! out of nothing, like dark magic! (as the compiler knows that it was used in some code but nobody declared it).

This anwers why we got the value *1* on the first *console.log* statement. And as we can see, the SAME THING occurs in the other normal function (doesnt necessarily need to be an IFFE).

But why we got *ReferenceError* when the last *console.log* statement was called passing the variable *aAB*? well, because it was declared inside the function *ab*, not in the global scope. And you might wonder why the compiler didnt create another global variable... because it was declared! the compiler created the global *bAB* before because it was referenced (and the reference of it wasnt inside the function, in other words, it was not declared inside that function), so the engine moved to the next scope to look for it, and the engine asked the global scope (and the global scope had that because in other time, on the compiler phase, the compiler knew that this variable was referenced in the code and nobody declared it, so the compiler created this variable in the global scope).

![GIF](../gifs/baby.gif)

<sub>More about it [here](http://stackoverflow.com/questions/33591202/iife-and-global-scope-in-javascript) and [here](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch2.md).</sub>

# var, consts and scope

## What will be printed by each of the following code snippets?

    var a = 1;
    var a = 2;
    console.log(a);

Result: ?

    var a = 1;
    let a = 2;
    console.log(a);

Result: ?

    var a = 1;
    const a = 2;
    console.log(a);

Result: ?

    let a = 1;
    const a = 2;
    console.log(a);

Result: ?

    const a;
    a = 2;
    console.log(a);

Result: ?

    let a;
    a = 2;
    console.log(a);

Result: ?

## Result (assuming that you've tried):

    2
    SyntaxError: Identifier 'a' has already been declared
    SyntaxError: Identifier 'a' has already been declared
    SyntaxError: Identifier 'a' has already been declared
    SyntaxError: Missing initializer in const declaration
    2

## But what? why?

* Independently it the variable is *let, const, var*, you cant declare it in the same scope more than once.
* You cant declare a *const* (constant) without assigning it right away (as you cant assign again the same *const* variable, because you know, constant are constants.
* You can declare *let* without assign it right away.

# Passing references around

## What will be printed?

    var a = {
      b: 2
    };
    var c = a;
    c.b = 1;
    console.log(a.b);
    console.log(c.b);

    const d = {
      e: 0
    };
    d.e = 1;
    console.log(d.e);
    const f = d;
    f.e = 2;
    console.log(d.e);
    console.log(f.e);

    d = a;
    console(d.b);

## Result:

    1
    1
    1
    2
    2
    TypeError: Assignment to constant variable.

## But what? why?

After declaring a simple object and assigning it to the variable *a* and then assiging the value of *a* to the variable *c* you might wonder "..well, now the variable *c* have the same value as *a* after the assignment, so *c* is just a copy of *a*."... and quess what? thats not whats its happening here. Actually, in JavaScript, when you assign a object to another object you are **just passing references around**. The variable *c* its just holding a reference to the variable *a* (from now on, if you change *c* you change *a*). And this explains why the property *b* inside *a* has a value of *1* after changing *c*. So the first 2 *console.log* statements will print *1* (not *2*).

And what about those *const* variables? why we are not getting some bad ass *Uncaught TypeError: Assignment to constant variable.* message after the expression *d.e = 1*? looks like we are assiging a *const*! how?

The documentation states:

    ...constant cannot change through re-assignment
    ...constant cannot be re-declared

When you're adding to an array or object you're not re-assigning or re-declaring the constant, it's already declared and assigned, you're just adding to the "list" that the constant points to.

So this works fine:

    const x = {};
    x.foo = 'bar';
    console.log(x); // {foo : 'bar'}

and this:

    const y = [];
    y.push('foo');
    console.log(y); // ['foo'];

but neither of these:

    const x = {};
    x = {foo: 'bar'}; // error - re-assigning

    const y = ['foo'];
    const y = ['bar']; // error - re-declaring

    const foo = 'bar'; 
    foo = 'bar2';      // error - can not re-assign
    var foo = 'bar3';  // error - already declared
    function foo() {}; // error - already declared

Consider C - arrays are just glorified pointers. A constant array only means that the value of the pointer will not change - but in fact the data contained at that address is free to.

In javascript, you are allowed to call methods of constant objects (of course - otherwise constant objects would not serve much purpose!) These methods might have the side effect of modifying the object. Since arrays in javascript are objects, this behavior applies to them as well.

All you are assured of is that the constant will always point to the same object. The properties of the object itself are free to change.

<sub>Where i got this example? [here.](http://stackoverflow.com/questions/23436437/why-can-i-change-value-of-a-constant-in-javascript)</sub>

# Destructing the ES6 code to get the knowledge

## What will be printed?

    var a = {
      b: 1,
      c: 2
    }
    console.log(b, c);
    var {b, c} = a;
    console.log(b, c);

    var {b: e, c: f} = a;
    console.log(e, f);

    var {g, h = 1} = a;
    console.log(g, h);

Result:

    undefined undefined
    1 2
    1 2
    undefined 1

## But what? why?

The first result of the *console.log* statement its ok, right? *undefined undefined* because *b* and *c* wasnt declared in this code so the compiler declared for us unfortunatly (we are not considering ["use strict"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) here), but they are still *undefined*. But what about the other results? 

ES6 introduced something called [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). It is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

The destructuring assignment uses similar syntax of object and array literal expressions to create *ad hoc* packages of data, but on the left-hand side of the assignment to define what values to unpack from the sourced variable.

    var x = [1, 2, 3, 4, 5];
    var [y, z] = x;
    console.log(y); // 1
    console.log(z); // 2

### Object destructuring

Basic assignment: **Here is the reason of the 2nd *console.log* result**.

    var o = {p: 42, q: true};
    var {p, q} = o;

    console.log(p); // 42
    console.log(q); // true

Assigning to new variable names

A property can be unpacked from an object and assigned to a variable with a different name than the object property. **Here is the reason of the 3rd *console.log* result**.

    var o = {p: 42, q: true};
    var {p: foo, q: bar} = o;
    
    console.log(foo); // 42 
    console.log(bar); // true

The last *console.log*.. well, that's easy too. *g* was declared in the destruction as property of *a* but it doesnt have values assigned to it, so its *undefined*. And the property *h* has de default value of *1* on our destructor (but if *a* had the property *h* already there with some value assigned before, the result would be the original value and not the default *1*).

# ES5 to ES6, try to sum and then you will see

## Consider the following:
    function func() {
      //**
    }

    func(1, 2, 3, 4);

## Add a code on the line //** (body of the function) which will print the sum of parameters. 

Use ES5! Are you able to code in ES6? **Do changes on func only!**

## Answer:

    // ES5
    function func() {
        var numbers = Array.prototype.slice.call(arguments);
        console.log(numbers.reduce(function(a, b) { return a + b; }));
    }


    // ES6
    function func(...numbers) {
        console.log(numbers.reduce((a, b) => a + b));
    }

What this *...* means? Well, the [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) syntax allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) or multiple variables  (for destructuring assignment) are expected.

For function calls:

    myFunction(...iterableObj);

For array literals:

    [...iterableObj, 4, 5, 6];

Before:

    function myFunction(x, y, z) { }
    var args = [0, 1, 2];
    myFunction.apply(null, args);

<sub>This example: it is common to use Function.prototype.apply in cases where you want to use an array as arguments to a function. The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object). **In non-strict mode code, null and undefined will be replaced with the global object**, and primitive values will be boxed.</sub>

Now (replace apply):

    function myFunction(x, y, z) { }
    var args = [0, 1, 2];
    myFunction(...args);

Any argument in the argument list can use spread syntax and it can be used multiple times.

    function myFunction(v, w, x, y, z) { }
    var args = [0, 1];
    myFunction(-1, ...args, 2, ...[3]);

# new Array? = []? = which? why?

## What will be printed?

    var arr = new Array(3);
    console.log(arr[1]);

## Result:

    undefined

## But what? why?

If the only argument passed to the Array constructor is an integer between 0 and 232-1 (inclusive), this returns a new JavaScript array with its length property set to that number (Note: this implies an array of arrayLength empty slots, not slots with actual undefined values). If the argument is any other number, a RangeError exception is thrown.

When you create an array using:

    var a = [];

You're telling the interpreter to create a new runtime array. No extra processing necessary at all. Done.

If you use: 

    var a = new Array();

You're telling the interpreter, I want to call the constructor "Array" and generate an object. It then looks up through your execution context to find the constructor to call, and calls it, creating your array.

<sub>More about arrays [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [here](http://stackoverflow.com/questions/931872/what-s-the-difference-between-array-and-while-declaring-a-javascript-ar).</sub>

# Arrays and Objects

## What will be printed? (separate execution)

    var arr = [{1: '2'}, {2: '1'}];
    console.log(arr['1'])

    var arr = [1, 2];
    console.log(arr['1']);

## Result: 

    {2: '1'}

    2

## But what? why?

JavaScript properties that begin with a digit cannot be referenced with dot notation; and must be accessed using bracket notation. For example, if you had an object with a property named '3d', it can only be referenced using bracket notation. E.g.:

    var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
    console.log(years.0);   // a syntax error
    console.log(years[0]);  // works properly

    renderer.3d.setTexture(model, 'character.png');     // a syntax error
    renderer['3d'].setTexture(model, 'character.png');  // works properly

Note that in the 3d example, '3d' had to be quoted. It's possible to quote the JavaScript array indexes as well (e.g., years['2'] instead of years[2]), although it's not necessary. The 2 in years[2] is coerced into a string by the JavaScript engine through an implicit toString conversion. It is for this reason that '2' and '02' would refer to two different slots on the years object and the following example could be true:

    console.log(years['2'] != years['02']);

Similarly, object properties which happen to be reserved words(!) can only be accessed as string literals in bracket notation(but it can be accessed by dot notation in firefox 40.0a2 at least):

    var promise = {
      'var'  : 'text',
      'array': [1, 2, 3, 4]
    };

    console.log(promise['var']);

Take a look [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

# Now its time to increase the level dificulty + 1

## Create a function which can be executed like this foo(x)(y) and will give the product between x and y.

## Answer:

    var foo = a => b => a * b;

Very smart right? this was just to show the power of ES6.

Answer with ES5:

    function foo(x) {
        return function(y) {
            return (x * y);
        };
    }

## But what? why?

## Forgot this type of function... and Closures

### The type of the function that i`ve forgot.

### Closures
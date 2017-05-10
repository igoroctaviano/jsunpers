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

Most browsers have a minimum delay that is more then 0, so putting 0 as delay means: Put this task in the basket as soon as possible. If you dont pass the delay parameter to the *setTimeout* function, it menas that it wont necessarily run right away, neither will explicitly settting the delay to 0. The reason is that *setTimeout* removes the function from the execution queue and it will only be invoked after JavaScript has finished with the current execution queue.

When you use a *let* variable in the *for* loop, it means that this variable is not acessible before they are declared in their enclosing block. A variable declared as *let* are block scoped variables. So it means that it only exists inside the *for* loop block. But when you use *var* instead, it means that the variable is scoped to the nearest function block, not in you were using *let* where it would be scoped to the nearest enclosing block. **But both are global if OUTSIDE any block!**

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
Here is the differente. *let* is only visible in the *for* loop and *var* is visible to the whole function:

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
* Less risk of memory leaks due to variables staying in memory long after they have become irrelevant (in the for example you can see that if you declare a *let* variable inside the *for*, when the *for* completes the execution, the *let* variable will be irrelevant and will be discarded, freeing memory, avoiding leaks!).

# What will be printed?

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

## What?

So, basically, the first *console.log* will ask for the value of the *ar* variable inside this enclosing block of code first. As you can see, the variable *ar* was declared using *var* so it means that it is scoped to the nearest function block, in this case it is global (outside any function) and it can be also acessed before it was declared... So as we can see, we have another declaration of the variable *ar* and as it is *var* it will override the current value of *ar* that is 1, becoming 2 now. 

Lets imagine a conversation! **console.log says:** "Hey code block, do you know about *ar*?"; **code block says:** "Fore sure! its value is 2!". Then moving on to the next *console.log* statement... **console.log says:** "Dude, can you tell the value of *et*?"; **code block says:** "Yep! its 2!". As you can see in this example, we are using a *let* variable, it was not overwritten! because this *let* can only exists inside this enclosing block (this is how it works). Moving on... outside this code block.. **console.log says:** "Me again, whats the value of *ar*?"; **code block says:** "Alright, it was overwritten by some other code, it was 1 but now its 2!". Moving on.. we reached our last *console.log* statement! **console.log says:** "Just one more time, whats the value of *et*?"; **code block says:** "Its 1!". And you know why right? this *let* variable belongs to the nearest enclosing block, i means that it belongs to the global scope and it will not be overwritten inside some other code block.

# What will be printed?

    var a = 1;
    console.log("var", a === 1);
    console.log(func());
    
    function func(){
      return "hello";
    }
    
    console.log(func2());
    
    var func2 = function(){
      return "hello";
    }

## Return:
    var true
    hello
    TypeError: func2 is not a function

## But what? why?

In JavaScript we have something called hoising!
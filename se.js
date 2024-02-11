const express = require("express");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const mycodefile = req.body.text;
  const langselect = req.body.lan;
  const inputfrom = req.body.input1;
  try {
    if (langselect === "C") {
      await fs.writeFile("Cprogram.c", mycodefile);
      const { error, stdout, stderr } = await exec(
        "gcc Cprogram.c -o data.exe"
      );
      if (stderr) {
        res.status(500).send(stderr);
      } else {
        const executionCommand =
          process.platform === "win32" ? "data.exe" : "./data.exe";
        const { stdout, stderr } = await exec(
          `echo ${inputfrom} | ${executionCommand}`
        );
        res.send(stdout);
      }
    } else if (langselect === "C++") {
      await fs.writeFile("CPP.cpp", mycodefile);
      const { error, stdout, stderr } = await exec("g++ CPP.cpp -o obj.exe");
      if (stderr) {
        res.status(500).send(stderr);
      } else {
        const executionCommand =
          process.platform === "win32" ? "obj.exe" : "./obj.exe";
        const { stdout, stderr } = await exec(
          `echo ${inputfrom} | ${executionCommand}`
        );
        res.send(stdout);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log("Server start");
});


// const express = require("express");
// const path = require("path");
// const { promisify } = require("util");
// const exec = promisify(require("child_process").exec);
// const app = express();
// const bodyParser = require("body-parser");
// const fs = require("fs").promises;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.post("/", async (req, res) => {
//   console.log(req.body);

//   const mycodefile = req.body.text;
//   const langselect = req.body.lan;
//   const inputfrom = req.body.input1;

//   try {
//     if (langselect === "C") {
//       await fs.writeFile("Cprogram.c", mycodefile);
//       const { error, stdout, stderr } = await exec("g Cprogram.c -o data.exe");
//       console.log(error, "34", stderr, "56", stdout, "12");
//       if (stderr) {
//         res.status(500).send({ error: "Compilation error", message: stderr });
//       } else {
//         console.log("go");
//         const { stdout, stderr } = await exec(`echo ${inputfrom} | data.exe`);
//         console.log(stdout);
//         const temp = `<!DOCTYPE html>
//             <html lang="en">
            
//             <head>
//                 <meta charset="UTF-8">
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Online Compiler</title>
//                 <style>
// .container-fluid{
//     background-color: black;
// }
// .navbar {
//   padding: 1rem;
  
// }

// .navbar-brand {
//   font-size: 1.5rem;
//   font-weight: bold;
// }
// #Runcode {
 
//   background-color: #007bff;
//   color: #fff; 
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   transition: background-color 0.3s ease, color 0.3s ease; 
// }

// #Runcode:hover {
//   background-color: #0056b3; 
//   color: #fff; 
// }

// .form-select {
//   width: 100%;
//   max-width: 300px;
// }
// .form-control {
//   resize: vertical;
// }

// .btn {
//   margin-top: 1rem;
// }
// #exampleFormControlTextarea1 {
//   resize: vertical;
// }

// @media (max-width: 768px) {
//   .navbar-brand {
//     font-size: 1.2rem;
//   }

//   .form-select {
//     max-width: none;
//   }
// }


//     </style>
//             </head>
            
//             <body>
//                 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
//                     integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            
//                 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
//                     integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
//                     crossorigin="anonymous"></script>
            
            
//                 <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                     <div class="container-fluid">
//                         <a class="navbar-brand" href="#">
//                             <h1>
//                                 <h1> Online Compiler <span class="badge bg-secondary">
//                                         < />
//                                     </span></h1>
//                             </h1>
//                         </a>
//                         <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                             data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
//                             aria-label="Toggle navigation">
//                             <span class="navbar-toggler-icon"></span>
//                         </button>
//                         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
//                         </div>
            
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#">
//                                     <h3> Code Compile & Run</h3>
//                                 </a>
//                             </li>
            
            
//                         </ul>
            
//                     </div>
//                 </nav>
            
//                 <br>
//                 <form method="post" action="">
//                 <div class="container-fluid">
//                     <select class="form-select  border-width=7" name="lan" aria-label="Default select example mx-5">
//                         <option selected >${langselect}</option>
//                         <option name="lan1" value="C">C</option>
//                         <option name="lan1" value="C++">C++</option>
                        
            
//                     </select>
//                     <br>
                    
//                         <div class="row">
//                             <div class="col rows">
//                                 <textarea input type="text" placeholder="// Write your code here " class="form-control" id="text" name="text"
//                                     rows="19">${mycodefile}</textarea>
//                                 <br>
            
                            
//                                 <button type="submit" name="Runcode" id="Runcode" class="btn btn-secondary btn-primary">Run</button>
//                             </div>
                    
//                     <div class="col">
            
//                         <h3> <span class="badge bg-secondary">
//                                 OUTPUT
//                             </span></h1>
//                         </h3>
//                         <br>
                    
//                         <textarea input type="text" class="form-control" id="exampleFormControlTextarea1" rows="8">${stdout}</textarea>
            
//                         <br>
//                         <!-- Vertically centered scrollable modal -->
//                         <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
//                             data-bs-whatever="@mdo">Custom Input</button>
            
            
//                         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
//                             aria-hidden="true">
//                             <div class="modal-dialog">
//                                 <div class="modal-content">
            
//                                     <div class="modal-body">
                                        
            
//                                             <div class="mb-3">
//                                                 <label for="message-text" class="col-form-label">Input</label>
//                                                 <textarea class="form-control" id="input1" name="input1" rows="7"></textarea>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     <div class="modal-footer">
//                                         <button  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                         <button  class="btn btn-primary">Ok</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
            
//                     </div>
//                 </div>
            
//                 </div>
            
//             </body>
            
//             </html>`;
//         res.send(temp);
//       } //else {
//       //     console.log("success");
//       //   }
//     } else if (langselect === "C++") {
//       await fs.writeFile("CPP.cpp", mycodefile);
//       const { stdout, stderr } = await exec("g++ CPP.cpp -o obj.exe");
//       if (stderr) {
//         console.log("compiled");
//         return;
//       }
//       if (inputfrom === "") {
//         console.log("go");
//         const { stdout, stderr } = await exec("obj.exe");
//         console.log(stdout, stderr, "123");
//         if (stderr) {
//           console.log("messed up");
//         } else if (stdout) {
//           const temp = `<!DOCTYPE html>
//           <html lang="en">
          
//           <head>
//               <meta charset="UTF-8">
//               <meta http-equiv="X-UA-Compatible" content="IE=edge">
//               <meta name="viewport" content="width=device-width, initial-scale=1.0">
//               <title>Online Compiler</title>
//               <style>
// .container-fluid{
//     background-color: black;
// }
// .navbar {
//   padding: 1rem;
  
// }

// .navbar-brand {
//   font-size: 1.5rem;
//   font-weight: bold;
// }
// #Runcode {
 
//   background-color: #007bff;
//   color: #fff; 
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   transition: background-color 0.3s ease, color 0.3s ease; 
// }

// #Runcode:hover {
//   background-color: #0056b3; 
//   color: #fff; 
// }

// .form-select {
//   width: 100%;
//   max-width: 300px;
// }
// .form-control {
//   resize: vertical;
// }

// .btn {
//   margin-top: 1rem;
// }
// #exampleFormControlTextarea1 {
//   resize: vertical;
// }

// @media (max-width: 768px) {
//   .navbar-brand {
//     font-size: 1.2rem;
//   }

//   .form-select {
//     max-width: none;
//   }
// }


//     </style>
//           </head>
          
//           <body>
//               <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
//                   integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
          
//               <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
//                   integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
//                   crossorigin="anonymous"></script>
          
          
//               <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                   <div class="container-fluid">
//                       <a class="navbar-brand" href="#">
//                           <h1>
//                               <h1> Online Compiler <span class="badge bg-secondary">
//                                       < />
//                                   </span></h1>
//                           </h1>
//                       </a>
//                       <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                           data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
//                           aria-label="Toggle navigation">
//                           <span class="navbar-toggler-icon"></span>
//                       </button>
//                       <div class="collapse navbar-collapse" id="navbarSupportedContent">
          
//                       </div>
          
//                       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          
//                           <li class="nav-item">
//                               <a class="nav-link" href="#">
//                                   <h3> Code Compile & Run</h3>
//                               </a>
//                           </li>
          
          
//                       </ul>
          
//                   </div>
//               </nav>
          
//               <br>
//               <form method="post" action="/">
//               <div class="container-fluid">
//                   <select class="form-select  border-width=7" name="lan" aria-label="Default select example mx-5">
//                       <option selected >${langselect}</option>
//                       <option name="lan1" value="C">C</option>
//                       <option name="lan1" value="C++">C++</option>
                      
          
//                   </select>
//                   <br>
                  
//                       <div class="row">
//                           <div class="col rows">
//                               <textarea input type="text" placeholder="// Write your code here " class="form-control" id="text" name="text"
//                                   rows="19">${mycodefile}</textarea>
//                               <br>
          
                          
//                               <button type="submit" name="Runcode" id="Runcode" class="btn btn-secondary btn-primary">Run</button>
//                           </div>
                  
//                   <div class="col">
          
//                       <h3> <span class="badge bg-secondary">
//                               OUTPUT
//                           </span></h1>
//                       </h3>
//                       <br>
                  
//                       <textarea input type="text" class="form-control" id="exampleFormControlTextarea1" rows="8">${stdout}</textarea>
          
//                       <br>
//                       <!-- Vertically centered scrollable modal -->
//                       <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
//                           data-bs-whatever="@mdo">Custom Input</button>
          
          
//                       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
//                           aria-hidden="true">
//                           <div class="modal-dialog">
//                               <div class="modal-content">
          
//                                   <div class="modal-body">
                                      
          
//                                           <div class="mb-3">
//                                               <label for="message-text" class="col-form-label">Input</label>
//                                               <textarea class="form-control" id="input1" name="input1" rows="7"></textarea>
//                                           </div>
//                                       </form>
//                                   </div>
//                                   <div class="modal-footer">
//                                       <button  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                       <button  class="btn btn-primary">Ok</button>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
          
//                   </div>
//               </div>
          
//               </div>
          
//           </body>
          
//           </html>`;
//           res.send(temp);
//         } else {
//           console.log("success");
//         }
//       } else {
//         const { stdout, stderr } = await exec(`echo ${inputfrom} | obj.exe`);

//         if (stderr) {
//           console.log("Error occurred while running the compiled program.");
//         } else {
//         }
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server start");
// });

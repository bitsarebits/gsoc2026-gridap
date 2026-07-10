@def title = "GSoC 2026: Neural Operators in Gridap.jl"
@def hasmath = true
@def hascode = true

# Reduced Order Modelling with Neural Operators

* **Contributor:** Isaia Zollo - ~~~<a href="https://github.com/bitsarebits" target="_blank">GitHub</a>~~~
* **Mentors:** Nicholas Mueller, Eric Neiva, Martina Gatti
* **Organization:** Gridap (under the NumFOCUS umbrella)

**Project Links:**
* **Scripts & Backend:** ~~~<a href="https://github.com/bitsarebits/Gridap-NeuralOperators-GSoC2026" target="_blank">GitHub Repository</a>~~~
* **Live Dashboard:** ~~~<a href="https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/" target="_blank">Online Experiment Gallery</a>~~~


Notes and progress from my GSoC 2026 project. The goal is to bring Neural Operators into the ~~~<a href="https://github.com/gridap/Gridap.jl" target="_blank">Gridap.jl</a>~~~ ecosystem, specifically extending the ~~~<a href="https://github.com/gridap/GridapROMs.jl" target="_blank">GridapROMs.jl</a>~~~ package to enable fast, nonlinear PDE simulations.

---

### Devlog Timeline
* [May 24, 2026 - Kicking off GSoC 2026](#kicking-off)
* [June 10, 2026 - The Exploratory Phase](#exploratory-phase)
* [June 25, 2026 - Scaling Up](#scaling-up)
* [July 09, 2026 - Midterm Evaluation](#midterm-evaluation)

---

~~~<a id="kicking-off"></a>~~~
### Kicking off GSoC 2026: Bridging Julia, PDEs, and Neural Operators

**Date:** May 24, 2026

The Google Summer of Code 2026 has officially started! As summarized above, I’ll be working with the Gridap organization (supported by the NumFOCUS umbrella) to integrate Neural Operators into their ecosystem.

During this Community Bonding period, I had a couple of very productive meetings with the whole mentoring team—Nicholas Mueller, Eric Neiva, and Martina Gatti—to set up our communication schedule and define the overall scope of the project. On a day-to-day basis, I’ve been working mostly with Eric Neiva, who helped me navigate the PDE theory and the `Gridap.jl` ecosystem.

My background is mostly in computer science and systems programming, so my first priority during this phase was aligning on the mathematical formulations and getting comfortable with the `Gridap.jl` tools. I spent the last few weeks reading the documentation, configuring my local environment, and planning out the first coding tasks. We decided to start testing the models on simple equations to get a reliable baseline before moving to more complex physics.

---

~~~<a id="exploratory-phase"></a>~~~
### The Exploratory Phase: Theory, Pluto Notebooks, and Model Trade-offs

**Date:** June 10, 2026

The coding phase is underway, starting with a strong focus on prototyping. To establish a solid mathematical baseline for Reduced Order Modeling within our setup, I built a series of Pluto notebooks.

The first 5 notebooks were dedicated to mastering `Gridap.jl` and `GridapROMs.jl`, focusing on standard linear ROMs applied to elliptic, parabolic, and hyperbolic PDEs. The remaining notebooks tested the integration of `NeuralOperators.jl` into the workflow.

We are currently evaluating several models to decide what will eventually be merged into `GridapROMs.jl`. I've been experimenting with FNO (Fourier Neural Operator), DeepONet, and NOMAD. Meanwhile, my mentors and I are also discussing more modern architectures like CNO, CNN, UNet, WaveletNet, GNN, and GNO.

This exploration has highlighted some clear trade-offs:

- **The Mesh Dilemma:** Models like FNO and CNO perform incredibly well but require uniform grids. This is a severe limitation for `GridapROMs.jl`, as Gridap heavily relies on non-uniform, complex meshes.

- **The Point-Based Advantage:** DeepONet and NOMAD handle arbitrary point evaluations natively, but they sometimes struggle to match the performance and accuracy of FNO.

- **The Graph Alternative:** Graph Neural Operators (GNN/GNO) are natively suited for complex meshes, but they are complex to implement and highly demanding on memory and compute.

We are still finalizing the roster, but the current idea is to expose a few simple models (like DeepONet and FNO) and potentially offer a Graph-based model for users with access to HPC clusters.

---

~~~<a id="scaling-up"></a>~~~
### Scaling Up: DrWatson, Caching, and Building an Orchestrator Dashboard

**Date:** June 25, 2026

As the complexity of the project grew, Pluto notebooks started to show their limits. I needed a more robust way to manage hyperparameters, physical variables, and model weights. I migrated the workflow to a dedicated suite of [Julia scripts](https://github.com/bitsarebits/Gridap-NeuralOperators-GSoC2026) orchestrated by `DrWatson.jl`.

To prevent redundant and expensive FE computations, I built a custom caching mechanism called `HashRegistry.jl`. It computes a SHA-256 hash of the simulation parameters; if a pipeline step (data generation, model training, or evaluation) is already in the cache, it instantly loads the results. I also integrated Learning Rate Schedulers (only `CosineAnnealing` and `ReduceLROnPlateau` at the moment).

With so many parameters to tweak, interacting solely via the REPL became impractical. I decided to build an [interactive web dashboard](https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/) to act as a graphical orchestrator.

- **The Backend:** Built entirely in Julia using `Oxygen.jl`, serving REST APIs and WebSockets to stream real-time training losses and state updates.

- **The Frontend:** A Vite + React application. Since UI development isn't the main focus of this GSoC, I used Gemini (via the browser chat) to accelerate the process. I intentionally avoided autonomous AI coding agents to retain full architectural control and make all the structural decisions myself. However, having an AI assistant to quickly generate React boilerplate and styling allowed me to build a presentable interface without taking time away from the core Julia mechanics.

**A key architectural decision here was to remove Node.js as a dependency for end-users.** I configured the workflow so the React app is compiled into a static build (`npm run build`). The `Oxygen.jl` backend is set up to serve these static files directly. This means any user can launch the full interactive dashboard locally with only a Julia installation!

Now, I can configure the FEM generation, choose the model hyperparameters, and watch the training loop live, all from the browser.

---

~~~<a id="midterm-evaluation"></a>~~~
### Midterm Evaluation: Mini-Batches, Fine-Tuning, and XLA Compilation

**Date:** July 9, 2026


Tomorrow is the Midterm Evaluation deadline, and the last two weeks have been an intense coding marathon.

I’ve been heavily focused on refining the training loops. I successfully implemented mini-batch training, which revealed differences in how data must be managed and the resulting RAM consumption across the models:

- **DeepONet & FNO (Parameter-level batching):** For these architectures, the mini-batch size defines the number of physical parameters (e.g., our $\sigma$ values) processed at once. This means a tiny batch size of just 1 or 2 already pulls entire slices of the snapshot matrix.

    - **DeepONet:** Very efficient. Because it evaluates orthogonally, the spatial-temporal grid (Trunk input) remains static. We only batch over the initial condition sensors (Branch input) and the target matrix, making it lightweight.

    - **FNO (Grid-based):** While also batched by parameter, FNO requires passing the full spatial-temporal grid tensor for each simulation. Even with a very small batch size, we are passing giant multi-channel tensors `(N_x, N_t, batch)`. In 3D, the memory impact of this approach would be a major issue.

- **NOMAD (Point-level batching):** The data preparation here is entirely different. The entire snapshot matrix is flattened into a single array of individual $(x,t)$ coordinates. A batch size here means "number of individual points". We can easily pass a batch size of 2048. The memory impact per step is very low, but the initial condition sensors must be replicated to match every single coordinate, requiring a lot of iterations to converge.

I also added a **Cloud Sync & Fine-Tuning** feature. To make collaboration easier, I connected the dashboard to a Firebase backend (Firestore for metadata, Storage for plots and snapshot matrices/weights). Users can now browse a global catalog of shared experiments, pick a `pretrained_model_hash` from the cloud, and sync it to their local DrWatson workspace. Instead of starting from scratch with random weights, the Julia backend loads pre-trained weights (from database or local simulations) and begins fine-tuning on the newly selected data!

My biggest nemesis this week? **XLA Compilation times**. The first simulation on the server takes a long time to boot due to LLVM/XLA compilation via `Reactant.jl`. I've tried everything to shave off these 3-4 minutes—custom Julia sysimages, Level 1 `.ji` precompilation, and server warmup scripts. While the sysimage drastically improved library loading times, the XLA compilation lock during the first JIT pass remains a tough problem to solve. I've also fortified the `Oxygen.jl` server with thread mutexes and clean shutdown handling to manage active WebSocket simulations gracefully.

It's been a challenging but incredibly rewarding first half. Focusing now on Phase 2!
+++
title = "GSoC 2026: Neural Operators in Gridap.jl"
hasmath = true
hascode = true
+++

# Reduced Order Modeling with Neural Operators

* **Contributor:** Isaia Zollo - ~~~<a href="https://github.com/bitsarebits" target="_blank">GitHub</a>~~~
* **Mentors:** Nicholas Mueller, Eric Neiva, Martina Gatti
* **Organization:** Gridap (under the NumFOCUS umbrella)

### GSoC 2026 Final Deliverables
* **Phase 1 Experiments & Backend:** ~~~<a href="https://github.com/bitsarebits/Gridap-NeuralOperators-GSoC2026" target="_blank">GitHub Repository</a>~~~
* **Interactive Dashboard:** ~~~<a href="https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/" target="_blank">Online Experiment Gallery</a>~~~
* **Phase 2 GridapROMs.jl Integration** ~~~<a href="https://github.com/gridap/GridapROMs.jl/pull/72" target="_blank">Pull Request on GridapROMs.jl</a>~~~
* **Phase 2 New Library (NonLinearROMs.jl)** ~~~<a href="https://github.com/nichomueller/NonlinearROMs.jl" target="_blank">New Library created from the PR</a>~~~

Notes and progress from my GSoC 2026 project. The goal is to bring Neural Operators into the ~~~<a href="https://github.com/gridap/Gridap.jl" target="_blank">Gridap.jl</a>~~~ ecosystem, specifically extending the ~~~<a href="https://github.com/gridap/GridapROMs.jl" target="_blank">GridapROMs.jl</a>~~~ package to enable fast, nonlinear PDE simulations.

---

### Devlog Timeline
* [May 24, 2026 - Kicking off GSoC 2026](#kicking-off)
* [June 10, 2026 - The Exploratory Phase](#exploratory-phase)
* [June 25, 2026 - Scaling Up](#scaling-up)
* [July 09, 2026 - Midterm Evaluation](#midterm-evaluation)
* [July 23, 2026 - Phase 1 Wrap-up & The GridapROMs Blueprint](#phase-1-wrap-up)
* [August 06, 2026 - Wiring the Pipeline: DeepONet and NeuralOpStrategy](#wiring-the-pipeline)
* [August 24, 2026 - Expanding the Scope: NOMAD, Transient Problems, and Fine-Tuning](#transient-nomad-finetuning)
* [August 28, 2026 - The Final PR and a Change of Scenery](#final-pr-and-nonlinearroms)
* [September 09, 2026 - Beyond GSoC: Graph Neural Operators and a Kernel-Based Framework](#beyond-gsoc)
* [References & Further Reading](#references)
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

---

~~~<a id="phase-1-wrap-up"></a>~~~
### Phase 1 Wrap-up & The GridapROMs Blueprint

**Date:** July 23, 2026

The GSoC midterm evaluations are officially over, and it feels great to hit this milestone. Right up until the July 21st deadline, I was wrapping up the Phase 1 deliverables. The training loops and XLA compilation were the heavy lifters on the backend, but the interactive dashboard needed a lot of last-minute polish to actually be usable. I spent a few days wiring up strict input validations with Zod schemas so users can't accidentally crash the Julia backend with bad hyperparameter combinations. I also got a filtering system in place for the experiment catalog and added a dedicated "Docs" view to help people navigate the architecture.

With Phase 1 done, our July 22nd sync with my mentors became a real pivot point. We are moving away from standalone scripts and finally digging into the actual `GridapROMs.jl` source code.

The main objective here is to get Neural Operators integrated into the existing Reduced Basis ecosystem without breaking everything else. We sketched out the API during the meeting. The plan is to introduce a new `NeuralOpSolver` that sits in the solver hierarchy but bypasses the standard projection-based hyper-reduction steps.

Here are the initial stubs we came up with:

```julia
# The Neural Operator solver hangs off the GlobalRBSolver
const NeuralOpSolver{A,C<:NeuralOpReduction} = GlobalRBSolver{A,C,Nothing,Nothing}

function NeuralOpSolver(fesolver::GridapType, reduction::Reduction)
  # Notice the `nothing, nothing` — we don't need classical residual/jacobian reduction
  RBSolver(fesolver, GlobalContext(), reduction, nothing, nothing)
end

# The strategy defines the architecture and hyperparameters
struct DeepONetReduction <: NeuralOpReduction
  # ...
end

# The specialized Operator that holds the trained network instead of Galerkin matrices
struct NeuralRBOperator{O,T,A} <: RBOperator{O,T}  # A <: NeuralNetwork
  op::ParamOperator{O,T}
  model::A
end
```

It’s nice to see the neural models finally looking like native Gridap operators rather than floating scripts. The next step is actually filling these stubs with the training and inference logic.

---

### Wiring the Pipeline: DeepONet and NeuralOpStrategy

**Date:** August 6, 2026

Over the last couple of weeks, the focus has been entirely on turning those stubs into compliant Gridap code. After our July 31st sync, we narrowed the scope: get DeepONet working first, and worry about the rest later.

Shoving a neural network stack (`Lux.jl` and `Reactant.jl`) into a finite element library involves a lot of boilerplate and glue code. By isolating DeepONet, I could lock down the API boundaries—specifically `_extract_operator_data`, `train_neural_operator`, and `solve`. Once this core skeleton is solid, plugging in new neural operators should be pretty straightforward.

Here are the core design decisions behind that first major commit:

- **The `NeuralOpStrategy`:** I wanted the API to be flexible but out-of-the-box ready. If you just want a baseline model, you can pass `model = AutoDeepONet()` and it dynamically infers input dimensions from the physical problem. However, the strategy struct is open enough that you can inject custom architectures without being forced to use defaults.

- **Data Scaling (`max_u`):** Neural networks and unnormalized data don't mix well. I added logic to store the maximum absolute value (`max_u`) of the snapshot matrix inside the `NeuralRBOperator`. It automatically denormalizes forward pass predictions during the online `solve` phase.

- **Learning Rate Schedulers:** I ported the scheduler interface I built back in Phase 1 and adapted it for `GridapROMs.jl`. Right now it supports `CosineAnnealing` and `ReduceLROnPlateau` directly inside the Reactant-compiled loop, but the infrastructure is completely modular. Plugging in new custom schedulers will be trivial.

- **Gridap Compliance:** Moving from standalone scripts to the actual package meant following Gridap's `CONTRIBUTING.md` and formatting rules. I spent time cleaning up file layouts, and properly managing internal exports between modules. We also planned out a `TrainingLog` system for verbosity, but since it's a low-priority task, I haven't implemented it yet.

The result? A fully functional pipeline. We can now generate high-fidelity snapshots, train a DeepONet, and use it as a surrogate solver entirely inside the Gridap ecosystem. Next on the list: handling transient problems and building a sampling system. I've noticed that feeding the network a function sampled at various points works much better than just passing a single scalar parameter.

---

### Expanding the Scope: NOMAD, Transient Problems, and Fine-Tuning

**Date:** August 24, 2026

With the final deadline fast approaching, I spent the last couple of weeks sprinting to close out the remaining tasks. The DeepONet implementation provided a solid baseline, so extending the pipeline to support the NOMAD architecture was relatively straightforward. I also replaced the external `NeuralOperators.jl` dependencies with native `Lux.jl` implementations for both models to have tighter control over the forward passes and state management.

A major chunk of the work involved adapting the codebase for transient problems (`RBTransient`). Unlike steady-state problems, transient inference requires mapping the network outputs over a spatio-temporal grid. I implemented extraction methods to pull the `t_grid` and spatial coordinates, flattened them to feed the neural operators, and then reshaped the predictions back into the `RBParamVector` format expected by the GridapROMs solver. 

Coordinate extraction itself required some compromises. I implemented a somewhat "hacky" workaround using `get_coords_with_order` to map algebraic degrees of freedom to physical coordinates. To prevent silent failures, I added a strict check that throws an error (or a warning) if the user does not wrap their test space in an `OrderedFESpace`. We will need a more robust extraction method post-GSoC, but this works reliably for the PR.

To fulfill the goal I set in early August, I also finalized the sampling system by introducing the `branch_sampler` inside the `NeuralOpStrategy`. Instead of feeding raw scalars, users can now dynamically unpack parameters into complex spatial sensors or apply transformations (like log-scaling) before the automatic Z-score normalization kicks in:

```julia
# Example: Mapping physical parameters to spatial sensors
x_sensors = range(0, 1, length=50)

branch_sampler_func = (p) -> begin
    sigma, mu = p[1], p[2]
    sensors_f1 = [ (1 / √(2 * π * sigma)) * exp(-x^2 / (2 * sigma)) for x in x_sensors ]
    sensors_f2 = [ sin(mu * x) for x in x_sensors ]
    
    # The Branch Net expects a single flat 1D vector per sample
    return vcat(sensors_f1, sensors_f2) 
end

strategy = NeuralOpStrategy(model = AutoDeepONet(), branch_sampler = branch_sampler_func)
```

I also shipped the fine-tuning APIs. The `reduced_operator` function now accepts a `pretrained_op`. I added an `update_stats` boolean flag: keeping it false inherits the old Z-score normalization statistics for continual learning, while setting it to true recomputes the statistics for transfer learning on new domains. 

```julia
# Continual Learning: Inherits Z-scores (μ, σ) from the pre-trained domain
new_op = reduced_operator(solver, feop_ext, s_ext, pretrained_op; update_stats=false)

# Transfer Learning: Recomputes Z-scores for a drastically different physical scale
new_op = reduced_operator(solver, feop_ext, s_ext, pretrained_op; update_stats=true)
```

The last few days were all about codebase cleanup. I swapped out some messy `Union` types for cleaner `AbstractDeepONet` and `AbstractNOMAD` interfaces. I also finally got around to implementing that `TrainingLog` system we pushed down the priority list a few weeks ago, adjusting the verbosity levels to match how `GridapSolvers.jl` handles `ConvergenceLogs`. The last steps were writing the final test suites (focusing heavily on error handling) and drafting the documentation examples. The PR is ready for review.

---

~~~<a id="final-pr-and-nonlinearroms"></a>~~~
### The Final PR and a Change of Scenery

**Date:** August 28, 2026

I submitted the final pull request wrapping up my GSoC 2026 project. The PR aggregates all the work from the summer: DeepONet and NOMAD support for both steady and transient problems, the configurable `NeuralOpStrategy`, spatial and temporal subsampling via `step_x` and `step_t`, data normalization handling, and learning-rate schedulers like `CosineAnnealing` and `ReduceLROnPlateau`. It also includes the `branch_sampler` logic designed for multi-sensor inputs and algorithmic scaling.

```julia
# Define the strategy (Architecture, Hyperparameters, Schedulers)
strategy = NeuralOpStrategy(
    model = AutoNOMAD(width=64, depth=3),
    epochs = 2500,
    batch_size = 512,
    lr_scheduler = CosineAnnealing(lr_max=1f-3, lr_min=1f-6)
)

# Wrap the classical Gridap solver
neural_solver = NeuralOpSolver(LUSolver(), NOMADReduction(strategy))

# Offline Phase: Train the operator on snapshots
neural_rb_op = reduced_operator(neural_solver, feop, snapshots_train)

# Online Phase: Millisecond inference on new parameters
x_approx, stats = solve(neural_solver, neural_rb_op, param_test)
```

After submitting, I had a wrap-up meeting with the maintainers to discuss the integration. We ended up making an unexpected but logical decision regarding the codebase. 

Instead of merging the neural operator support directly into `GridapROMs.jl`, the maintainers decided to move it into a separate, dedicated package called `NonlinearROMs.jl`. This new package is currently being built by the team specifically for deep learning-based reduced-order models, making it a much more natural fit for my work.

As a result, my PR on `GridapROMs.jl` will be closed, and the code will be ported over to `NonlinearROMs.jl`. The maintainer noted that while the core DeepONet/NOMAD architectures and the `Lux`/`Reactant` training loops I wrote will remain exactly as implemented, the surrounding glue code—like data preparation, sampling, and file layout—will be adapted to fit the new package's architecture.

Honestly, it’s a smart pivot. Mixing heavy deep learning dependencies with classical projection-based ROMs was bound to cause bloat, so keeping them separate makes total sense.

That officially closes the chapter on my GSoC summer. Over the next few weeks, I’ll be working with the team to help migrate the components over to `NonlinearROMs.jl`. It has been a demanding summer, but building a functional neural operator backend from scratch for the Gridap ecosystem was an incredible deep dive into scientific machine learning and software design.

---

~~~<a id="beyond-gsoc"></a>~~~
### Beyond GSoC: Graph Neural Operators and a Kernel-Based Framework

**Date:** September 9, 2026

Even though my GSoC timeline officially ended in August, I wasn't quite ready to leave the project. During our wrap-up meeting on August 28th, I pitched the idea of staying on as a core contributor to implement Graph Neural Operators (GNOs). The mentors were fully on board. 

After taking a week off to recharge, we had our first kickoff meeting today to map out the implementation. 

We spent the meeting digging into the literature, specifically looking at Zongyi Li's seminal blog post on GNOs and sections 3 and 4 of the Kovachki paper. While reviewing these references, a really interesting architectural pattern emerged: GNOs aren't just an isolated architecture. Both GNOs and FNOs fit into a broader mathematical category of "kernel-formulation" (or kernel-based) neural operators.

This completely shifted our immediate plan. Instead of just diving in and hardcoding a GNO, my first task is to design a generic infrastructure and the right abstract types to host this entire family of kernel-based operators. The goal is to build an abstract framework so that, once the GNO is implemented, plugging in any other kernel-based architecture in the future will be practically seamless.

On the software side, we evaluated how to actually build this in Julia. Since Graph Neural Networks (GNNs) basically act as an umbrella framework for generalizing CNNs on unstructured grids, we are looking closely at `GraphNeuralNetworks.jl`. More specifically, we are interested in `GNNLux.jl`, as its design is heavily inspired by PyTorch Geometric and integrates perfectly with the Lux backend I set up this summer.

It is a massive architectural challenge, but I'm excited to keep contributing to the ecosystem. I'll start drafting the abstract types for `NonlinearROMs.jl` later this week.

---

~~~<a id="references"></a>~~~
### References & Further Reading

Throughout the project, I relied on several key papers and resources to understand and implement these architectures:
* **DeepONet:** [*DeepONet: Learning nonlinear operators for identifying differential equations based on the universal approximation theorem of operators*](https://arxiv.org/pdf/1910.03193) — Lu Lu, Pengzhan Jin, George Em Karniadakis.
* **NOMAD:** [*NOMAD: Nonlinear Manifold Decoders for Operator Learning*](https://arxiv.org/pdf/2206.03551) — Jacob H. Seidman, Georgios Kissas, Paris Perdikaris, George J. Pappas.
* **FNO:** [*Fourier Neural Operator for Parametric Partial Differential Equations*](https://arxiv.org/pdf/2010.08895) — Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar.
* **CNO:** [*Convolutional Neural Operators for robust and accurate learning of PDEs*](https://arxiv.org/pdf/2302.01178) — Bogdan Raonić, Roberto Molinaro, Tim De Ryck, Tobias Rohner, Francesca Bartolucci, Rima Alaifari, Siddhartha Mishra, Emmanuel de Bézenac.
* **GNO & Kernel-Based Operators:**
  * [*Graph Neural Operator for PDEs* (Blog Post)](https://zongyi-li.github.io/blog/2020/graph-pde/) — Zongyi Li.
  * [*Neural Operator: Graph Kernel Network for Partial Differential Equations*](https://arxiv.org/pdf/2003.03485) — Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar.
  * [*Neural Operator: Learning Maps Between Function Spaces With Applications to PDEs*](https://arxiv.org/pdf/2108.08481) — Nikola Kovachki, Zongyi Li, Burigede Liu, Kamyar Azizzadenesheli, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar.
  * [*Introduction to Graph Neural Networks: A Starting Point for Machine Learning Engineers*](https://arxiv.org/pdf/2412.19419v1) — James H. Tanis, Chris Giannella, Adrian V. Mariano.
  * [*GraphNeuralNetworks.jl Paper*](https://arxiv.org/pdf/2412.06354)

---

> **AI Usage Disclaimer:** To accelerate development on the non-core aspects of this project (specifically the React frontend, server boilerplate, and English proofreading), I utilized Google Gemini as a conversational assistant. No autonomous AI coding agents were used; I retained full architectural control, and all the core Julia mechanics, mathematical implementations, and design decisions were made entirely by me.

~~~<div style="font-size: 0.8em; color: #666; text-align: center; margin-top: 2rem;">~~~
~~~<em>"Google Summer of Code" and "GSoC" are trademarks of Google. NumFOCUS is a trademark of NumFOCUS. This project is an independent open-source contribution and is not officially endorsed by or affiliated with Google or NumFOCUS.</em>~~~
~~~</div>~~~
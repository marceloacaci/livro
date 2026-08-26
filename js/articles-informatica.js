/**
 * articles-informatica.js - 10 artigos cientificos de INFORMATICA (cs.DB, cs.DS, cs.DC, cs.SE, cs.CR, cs.NI, cs.PL)
 * Fontes reais do arXiv (ids verificados via arXiv API).
 */
window.MEU_BOLSO_ARTICLES_INFORMATICA = [
  {
    id: 'inf-2310.17129',
    title: "ECN based Congestion Control for a Software Defined Network",
    authors: ["Mohana Prasad Sathya Moorthy", "Manoj Kumar Sure", "Krishna M. Sivalingam"],
    year: 2023,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '2310.17129.pdf',
    localPath: 'artigos/informatica/2310.17129.pdf',
    sourceUrl: 'https://arxiv.org/abs/2310.17129',
    summary: "This paper deals with congestion control in a software defined network (SDN) setting. Presently, explicit router schemes, such as Explicit Congestion Notification (ECN), work in conjunction with the TCP protocol to handle congestion in a distributed manner. With the emergence of SDN and centralized control, it is possible to leverage the global view of the network state to make better congestion control decisions. In this work, we explore the advantages of bringing in global information into distributed congestion control. We propose a framework where the controller with its global view of the network actively participates in the congestion control decisions of the end TCP hosts, by setting the ECN bits of IP packets appropriately. Our framework can be deployed very easily without any change to the end node TCPs or the SDN switches. We also show 30x improvement over the TCP Cubic variant and 1.7x improvement over TCP/RED in terms of flow completion times for one implementation of this framework, using the Mininet emulator.",
    tags: ["informatica", "NI"]
  },
  {
    id: 'inf-1603.04467',
    title: "TensorFlow: Large-Scale Machine Learning on Heterogeneous Distributed Systems",
    authors: ["Mart\u00edn Abadi", "Ashish Agarwal", "Paul Barham", "Eugene Brevdo", "Zhifeng Chen", "Craig Citro", "Greg S. Corrado", "Andy Davis", "Jeffrey Dean", "Matthieu Devin", "Sanjay Ghemawat", "Ian Goodfellow", "Andrew Harp", "Geoffrey Irving", "Michael Isard", "Yangqing Jia", "Rafal Jozefowicz", "Lukasz Kaiser", "Manjunath Kudlur", "Josh Levenberg", "Dan Mane", "Rajat Monga", "Sherry Moore", "Derek Murray", "Chris Olah", "Mike Schuster", "Jonathon Shlens", "Benoit Steiner", "Ilya Sutskever", "Kunal Talwar", "Paul Tucker", "Vincent Vanhoucke", "Vijay Vasudevan", "Fernanda Viegas", "Oriol Vinyals", "Pete Warden", "Martin Wattenberg", "Martin Wicke", "Yuan Yu", "Xiaoqiang Zheng"],
    year: 2016,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1603.04467.pdf',
    localPath: 'artigos/informatica/1603.04467.pdf',
    sourceUrl: 'https://arxiv.org/abs/1603.04467',
    summary: "TensorFlow is an interface for expressing machine learning algorithms, and an implementation for executing such algorithms. A computation expressed using TensorFlow can be executed with little or no change on a wide variety of heterogeneous systems, ranging from mobile devices such as phones and tablets up to large-scale distributed systems of hundreds of machines and thousands of computational devices such as GPU cards. The system is flexible and can be used to express a wide variety of algorithms, including training and inference algorithms for deep neural network models, and it has been used for conducting research and for deploying machine learning systems into production across more than a dozen areas of computer science and other fields, including speech recognition, computer vision, robotics, information retrieval, natural language processing, geographic information extraction, and computational drug discovery. This paper describes the TensorFlow interface and an implementation of that interface that we have built at Google. The TensorFlow API and a reference implementation were released as an open-source package under the Apache 2.0 license in November, 2015 and are available at www.tensorflow.org.",
    tags: ["informatica", "DC", "LG"]
  },
  {
    id: 'inf-1505.06807',
    title: "MLlib: Machine Learning in Apache Spark",
    authors: ["Xiangrui Meng", "Joseph Bradley", "Burak Yavuz", "Evan Sparks", "Shivaram Venkataraman", "Davies Liu", "Jeremy Freeman", "DB Tsai", "Manish Amde", "Sean Owen", "Doris Xin", "Reynold Xin", "Michael J. Franklin", "Reza Zadeh", "Matei Zaharia", "Ameet Talwalkar"],
    year: 2015,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1505.06807.pdf',
    localPath: 'artigos/informatica/1505.06807.pdf',
    sourceUrl: 'https://arxiv.org/abs/1505.06807',
    summary: "Apache Spark is a popular open-source platform for large-scale data processing that is well-suited for iterative machine learning tasks. In this paper we present MLlib, Spark's open-source distributed machine learning library. MLlib provides efficient functionality for a wide range of learning settings and includes several underlying statistical, optimization, and linear algebra primitives. Shipped with Spark, MLlib supports several languages and provides a high-level API that leverages Spark's rich ecosystem to simplify the development of end-to-end machine learning pipelines. MLlib has experienced a rapid growth due to its vibrant open-source community of over 140 contributors, and includes extensive documentation to support further growth and to let users quickly get up to speed.",
    tags: ["informatica", "DC", "LG", "MS", "stat.ML"]
  },
  {
    id: 'inf-2009.08366',
    title: "GraphCodeBERT: Pre-training Code Representations with Data Flow",
    authors: ["Daya Guo", "Shuo Ren", "Shuai Lu", "Zhangyin Feng", "Duyu Tang", "Shujie Liu", "Long Zhou", "Nan Duan", "Alexey Svyatkovskiy", "Shengyu Fu", "Michele Tufano", "Shao Kun Deng", "Colin Clement", "Dawn Drain", "Neel Sundaresan", "Jian Yin", "Daxin Jiang", "Ming Zhou"],
    year: 2020,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '2009.08366.pdf',
    localPath: 'artigos/informatica/2009.08366.pdf',
    sourceUrl: 'https://arxiv.org/abs/2009.08366',
    summary: "Pre-trained models for programming language have achieved dramatic empirical improvements on a variety of code-related tasks such as code search, code completion, code summarization, etc. However, existing pre-trained models regard a code snippet as a sequence of tokens, while ignoring the inherent structure of code, which provides crucial code semantics and would enhance the code understanding process. We present GraphCodeBERT, a pre-trained model for programming language that considers the inherent structure of code. Instead of taking syntactic-level structure of code like abstract syntax tree (AST), we use data flow in the pre-training stage, which is a semantic-level structure of code that encodes the relation of \"where-the-value-comes-from\" between variables. Such a semantic-level structure is neat and does not bring an unnecessarily deep hierarchy of AST, the property of which makes the model more efficient. We develop GraphCodeBERT based on Transformer. In addition to using the task of masked language modeling, we introduce two structure-aware pre-training tasks. One is to predict code structure edges, and the other is to align representations between source code and code structure. We implement the model in an efficient way with a graph-guided masked attention function to incorporate the code structure. We evaluate our model on four tasks, including code search, clone detection, code translation, and code refinement. Results show that code structure and newly introduced pre-training tasks can improve GraphCodeBERT and achieves state-of-the-art performance on the four downstream tasks. We further show that the model prefers structure-level attentions over token-level attentions in the task of code search.",
    tags: ["informatica", "CL", "SE"]
  },
  {
    id: 'inf-1803.09473',
    title: "code2vec: Learning Distributed Representations of Code",
    authors: ["Uri Alon", "Meital Zilberstein", "Omer Levy", "Eran Yahav"],
    year: 2018,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1803.09473.pdf',
    localPath: 'artigos/informatica/1803.09473.pdf',
    sourceUrl: 'https://arxiv.org/abs/1803.09473',
    summary: "We present a neural model for representing snippets of code as continuous distributed vectors (\"code embeddings\"). The main idea is to represent a code snippet as a single fixed-length $\\textit{code vector}$, which can be used to predict semantic properties of the snippet. This is performed by decomposing code to a collection of paths in its abstract syntax tree, and learning the atomic representation of each path $\\textit{simultaneously}$ with learning how to aggregate a set of them. We demonstrate the effectiveness of our approach by using it to predict a method's name from the vector representation of its body. We evaluate our approach by training a model on a dataset of 14M methods. We show that code vectors trained on this dataset can predict method names from files that were completely unobserved during training. Furthermore, we show that our model learns useful method name vectors that capture semantic similarities, combinations, and analogies. Comparing previous techniques over the same data set, our approach obtains a relative improvement of over 75%, being the first to successfully predict method names based on a large, cross-project, corpus. Our trained model, visualizations and vector similarities are available as an interactive online demo at http://code2vec.org. The code, data, and trained models are available at https://github.com/tech-srl/code2vec.",
    tags: ["informatica", "AI", "LG", "PL", "stat.ML"]
  },
  {
    id: 'inf-1712.01208',
    title: "The Case for Learned Index Structures",
    authors: ["Tim Kraska", "Alex Beutel", "Ed H. Chi", "Jeffrey Dean", "Neoklis Polyzotis"],
    year: 2017,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1712.01208.pdf',
    localPath: 'artigos/informatica/1712.01208.pdf',
    sourceUrl: 'https://arxiv.org/abs/1712.01208',
    summary: "Indexes are models: a B-Tree-Index can be seen as a model to map a key to the position of a record within a sorted array, a Hash-Index as a model to map a key to a position of a record within an unsorted array, and a BitMap-Index as a model to indicate if a data record exists or not. In this exploratory research paper, we start from this premise and posit that all existing index structures can be replaced with other types of models, including deep-learning models, which we term learned indexes. The key idea is that a model can learn the sort order or structure of lookup keys and use this signal to effectively predict the position or existence of records. We theoretically analyze under which conditions learned indexes outperform traditional index structures and describe the main challenges in designing learned index structures. Our initial results show, that by using neural nets we are able to outperform cache-optimized B-Trees by up to 70% in speed while saving an order-of-magnitude in memory over several real-world data sets. More importantly though, we believe that the idea of replacing core components of a data management system through learned models has far reaching implications for future systems designs and that this work just provides a glimpse of what might be possible.",
    tags: ["informatica", "DB", "DS", "NE"]
  },
  {
    id: 'inf-1910.02054',
    title: "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models",
    authors: ["Samyam Rajbhandari", "Jeff Rasley", "Olatunji Ruwase", "Yuxiong He"],
    year: 2019,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1910.02054.pdf',
    localPath: 'artigos/informatica/1910.02054.pdf',
    sourceUrl: 'https://arxiv.org/abs/1910.02054',
    summary: "Large deep learning models offer significant accuracy gains, but training billions to trillions of parameters is challenging. Existing solutions such as data and model parallelisms exhibit fundamental limitations to fit these models into limited device memory, while obtaining computation, communication and development efficiency. We develop a novel solution, Zero Redundancy Optimizer (ZeRO), to optimize memory, vastly improving training speed while increasing the model size that can be efficiently trained. ZeRO eliminates memory redundancies in data- and model-parallel training while retaining low communication volume and high computational granularity, allowing us to scale the model size proportional to the number of devices with sustained high efficiency. Our analysis on memory requirements and communication volume demonstrates: ZeRO has the potential to scale beyond 1 Trillion parameters using today's hardware. We implement and evaluate ZeRO: it trains large models of over 100B parameter with super-linear speedup on 400 GPUs, achieving throughput of 15 Petaflops. This represents an 8x increase in model size and 10x increase in achievable performance over state-of-the-art. In terms of usability, ZeRO can train large models of up to 13B parameters (e.g., larger than Megatron GPT 8.3B and T5 11B) without requiring model parallelism which is harder for scientists to apply. Last but not the least, researchers have used the system breakthroughs of ZeRO to create the world's largest language model (Turing-NLG, 17B parameters) with record breaking accuracy.",
    tags: ["informatica", "DC", "LG", "stat.ML"]
  },
  {
    id: 'inf-2106.10014',
    title: "Software-Defined Networking for Data Centre Network Management: A Survey",
    authors: ["Jonathan Sherwin", "Cormac J. Sreenan"],
    year: 2021,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '2106.10014.pdf',
    localPath: 'artigos/informatica/2106.10014.pdf',
    sourceUrl: 'https://arxiv.org/abs/2106.10014',
    summary: "Data centres are growing in numbers and size, and their networks expanding to carry larger amounts of traffic. The traffic profile is constantly varying, particularly in cloud data centres where tenants arrive, leave, and may change their resource requirements in between, and so the network configuration must change at a commensurate rate. Software-Defined Networking - programmatic control of network configuration - has been critical to meeting the demands of modern data centre network management, and has been the subject of intense focus by the research community, working in conjunction with industry. In this survey, we review Software-Defined Networking research targeting the management and operation of data centre networks.",
    tags: ["informatica", "NI"]
  },
  {
    id: 'inf-1712.05889',
    title: "Ray: A Distributed Framework for Emerging AI Applications",
    authors: ["Philipp Moritz", "Robert Nishihara", "Stephanie Wang", "Alexey Tumanov", "Richard Liaw", "Eric Liang", "Melih Elibol", "Zongheng Yang", "William Paul", "Michael I. Jordan", "Ion Stoica"],
    year: 2017,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1712.05889.pdf',
    localPath: 'artigos/informatica/1712.05889.pdf',
    sourceUrl: 'https://arxiv.org/abs/1712.05889',
    summary: "The next generation of AI applications will continuously interact with the environment and learn from these interactions. These applications impose new and demanding systems requirements, both in terms of performance and flexibility. In this paper, we consider these requirements and present Ray---a distributed system to address them. Ray implements a unified interface that can express both task-parallel and actor-based computations, supported by a single dynamic execution engine. To meet the performance requirements, Ray employs a distributed scheduler and a distributed and fault-tolerant store to manage the system's control state. In our experiments, we demonstrate scaling beyond 1.8 million tasks per second and better performance than existing specialized systems for several challenging reinforcement learning applications.",
    tags: ["informatica", "AI", "DC", "LG", "stat.ML"]
  },
  {
    id: 'inf-1610.05820',
    title: "Membership Inference Attacks against Machine Learning Models",
    authors: ["Reza Shokri", "Marco Stronati", "Congzheng Song", "Vitaly Shmatikov"],
    year: 2016,
    venue: 'arXiv',
    tema: 'informatica',
    filename: '1610.05820.pdf',
    localPath: 'artigos/informatica/1610.05820.pdf',
    sourceUrl: 'https://arxiv.org/abs/1610.05820',
    summary: "We quantitatively investigate how machine learning models leak information about the individual data records on which they were trained. We focus on the basic membership inference attack: given a data record and black-box access to a model, determine if the record was in the model's training dataset. To perform membership inference against a target model, we make adversarial use of machine learning and train our own inference model to recognize differences in the target model's predictions on the inputs that it trained on versus the inputs that it did not train on. We empirically evaluate our inference techniques on classification models trained by commercial \"machine learning as a service\" providers such as Google and Amazon. Using realistic datasets and classification tasks, including a hospital discharge dataset whose membership is sensitive from the privacy perspective, we show that these models can be vulnerable to membership inference attacks. We then investigate the factors that influence this leakage and evaluate mitigation strategies.",
    tags: ["informatica", "CR", "LG", "stat.ML"]
  }
];
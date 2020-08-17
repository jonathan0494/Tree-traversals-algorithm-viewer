
$(document).ready(function(){

	class Stack{
		constructor(){
			this.items = [];
		}

		push(item){
			this.items.push(item);
		}

		pop(){
			if(this.isEmpty())
				return;
			return this.items.pop();
		}

		peek(){
			if(this.isEmpty())
				return;
			return this.items[this.size() - 1];
		}
		size(){
			return this.items.length;
		}
		isEmpty(){
			return this.size() == 0;
		}
	}
	class Queue{
		constructor(){
			this.items = [];
		}

		enqueue(element){
			this.items.push(element);

		}

		dequeue(element){
			if(this.isEmpty())
				return;
			return this.items.shift();
		}

		size(){
			return this.items.length;
		}

		isEmpty(){
			return this.items.length == 0;
		}
	}
	class Path{
		constructor(x, y){
			this.x = x;
			this.y = y;
		}

		getXCoordinate(){
			return this.x;
		}
		getYCoordinate(){
			return this.y;
		}
	}
	class Node{
		constructor(item, path){
			this.item = item;
			this.left = null;
			this.right = null;
			this.path = path;
			this.visited = false;

		}
	}
/*
	class BST{
		constructor(){
			this.root = null;
		}

		insert(item, path){
			let new_node = new Node(item, path);
			this.root = this.insertNode(this.root, new_node);
		}
		insertNode(root, node){
			if(root === null)
				return node;
			if(node.item < root.item){
				root.left = this.insertNode(root.left, node);
			}else{
				root.right = this.insertNode(root.right, node);
			}
			return root;
		}

		async printByLevelOrder(ctx){
			if(this.root === null)
				return;
			$('.dropdown-item').toggleClass("disabled");
			let queue = new Queue();
			queue.enqueue(this.root);
			while(!queue.isEmpty()){

					let node = queue.dequeue();
					var output = document.getElementById("result");
					output.insertAdjacentHTML('beforeend', node.item + " ");
					
					ctx.beginPath();
					ctx.fillStyle = "#478559";
					ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
					ctx.fill();
					ctx.font = "10px";
					ctx.fillStyle = '#FFFFFF';
					ctx.fillText(node.item, node.path.x, node.path.y);


					await this.sleep(1000);
					if(node.left != null){
						queue.enqueue(node.left);
					}
					if(node.right != null){
						queue.enqueue(node.right);
					}
			}
			$('.dropdown-item').toggleClass("disabled");
			ctx.closePath();

		}
		async performDFS(ctx){
			if(this.root == null)
				return;
			$('.dropdown-item').toggleClass("disabled");
			let stack = new Stack();
			stack.push(this.root);
			ctx.beginPath();
			ctx.fillStyle = "#000000";
			ctx.arc(this.root.path.x,this.root.path.y,20,0,Math.PI*2,true);
			ctx.fill();
			ctx.font = "10px";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(this.root.item, this.root.path.x, this.root.path.y);
			await this.sleep(1000);
			while(!stack.isEmpty()){
				let node = stack.peek();
				while(node.left != null && !node.left.visited){
					stack.push(node.left);
					node = node.left;
					ctx.beginPath();
					ctx.fillStyle = "#000000";
					ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
					ctx.fill();
					ctx.font = "10px";
					ctx.fillStyle = '#FFFFFF';
					ctx.fillText(node.item, node.path.x, node.path.y);
					await this.sleep(1000);
				}
				if(node.right != null && !node.right.visited){
					stack.push(node.right);
					ctx.beginPath();
					ctx.fillStyle = "#000000";
					ctx.arc(node.right.path.x,node.right.path.y,20,0,Math.PI*2,true);
					ctx.fill();
					ctx.font = "10px";
					ctx.fillStyle = '#FFFFFF';
					ctx.fillText(node.right.item, node.right.path.x, node.right.path.y);
					await this.sleep(1000);
				}else{
					node.visited = true;
					node = stack.pop();
					ctx.beginPath();
					ctx.fillStyle = "#478559";
					ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
					ctx.fill();
					ctx.font = "10px";
					ctx.fillStyle = '#FFFFFF';
					ctx.fillText(node.item, node.path.x, node.path.y);
					var output = document.getElementById("result");
					output.insertAdjacentHTML('beforeend', node.item + " ");
					await this.sleep(1000);
					console.log(node.item);
				}
			}
			$('.dropdown-item').toggleClass("disabled");
			ctx.closePath();
		}

		sleep(ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
		}
	}
*/
	class Tree{
		constructor(){
			this.root = null;
		}
	}

	/****************/
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext("2d");
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	/*Urilities*/
	var x = (canvas_width / 2);
	var y = 50;

	tree = new Tree();
	tree.root = null;
	/*Process file to get tree nodes*/
		document.getElementById('inputfile')
			.addEventListener('change', function(){

				let file = new FileReader();
				file.onload = function(){
					let nodes = file.result;
					nodes = nodes.split(',');
					let size = nodes.length;
					nodes[0] = nodes[0].substring(1);
					nodes[size - 1] = nodes[size - 1]
						
													.substring(0, nodes[size - 1].length - 1);
					
					/*new change*/
					for(let i in nodes){
						nodes[i] = new Node(nodes[i], new Path(0,0));
					}

					/**/
					$('#result').empty();
					//$("#inputfile").val('');
					$(":file").filestyle('clear');

					ctx.clearRect(0, 0, canvas_width, canvas_height);
					constructTree(nodes, tree);
				}
				file.readAsText(this.files[0]);
			});
			
	/************************************************/
	/*Construct tree from array order level node*/
	function constructTree(nodes, tree){
		if(isNaN(nodes[0].item))
			return;

		let space = 70;
		let size = nodes.length;
		nodes[0].path.x = x;
		nodes[0].path.y = y;
		tree.root = nodes[0]; 
		let n = 0;
		for(let i = 0; i < size; i++){
			let node = nodes[i];
			if(isNaN(node.item)){
				n = n + 1;
			}
			if(!isNaN(node.item)){

				let left = 2*i + 1 - 2*n;
				let right = 2*i + 2 - 2*n;

				if(left < size){
					if(isNaN(nodes[left].item)){
						node.left = null;
					}else{
						nodes[left].path.x = node.path.x - space;
						nodes[left].path.y = node.path.y + space;
						node.left = nodes[left];
					}
				}

				if(right < size){
					if(isNaN(nodes[right].item)){
						node.right = null;
					}else{
						nodes[right].path.x = node.path.x + space;
						nodes[right].path.y = node.path.y + space;
						node.right = nodes[right];
					}
				}
			}
		}

		drawTree(tree);
	}


	function drawTree(tree){
		if(tree == null)
			return;

		queue = new Queue();
		queue.enqueue(tree.root);
		
		let space = 60;
		let nodeRadius = 20;
		while(!queue.isEmpty()){
			let node = queue.dequeue();
			ctx.beginPath();
			if(node.left != null){
				node.left.path.x = node.path.x - space;
				node.left.path.y = node.path.y + space;
				ctx.moveTo(node.path.x, node.path.y);
				ctx.lineTo(node.left.path.x, node.left.path.y);
				ctx.stroke();
				queue.enqueue(node.left);
			} 
			if(node.right != null){
				node.right.path.x = node.path.x + space;
				node.right.path.y = node.path.y + space;
				ctx.moveTo(node.path.x, node.path.y);
				ctx.lineTo(node.right.path.x, node.right.path.y);
				ctx.stroke();
				queue.enqueue(node.right);
			}
			ctx.beginPath();
			ctx.fillStyle = "#ff1d58";
			ctx.arc(node.path.x,node.path.y,nodeRadius,0,Math.PI*2,true);
			ctx.fill();
			ctx.font = "10px";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(node.item, node.path.x, node.path.y);
		}
	}

	function resetVisitedNodes(root){
		if(root === null)
				return;
			queue = new Queue();
			queue.enqueue(root);
			while(!queue.isEmpty()){
				let node = queue.dequeue();
				node.visited = false;
				if(node.left != null){
					queue.enqueue(node.left);
				}
				if(node.right != null){
					queue.enqueue(node.right);
				} 
			}
	}

	/*Tree traversals algorithms*/
	async function breadthFirstSearch(root){
		if(root == null)
			return;
		$('.dropdown-item').toggleClass("disabled");
		queue = new Queue();
		queue.enqueue(tree.root);
		while(!queue.isEmpty()){
			let node = queue.dequeue();
			var output = document.getElementById("result");
			output.insertAdjacentHTML('beforeend', node.item + " ");
			/*Canvas modified*/
			ctx.beginPath();
			ctx.fillStyle = "#478559";
			ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
			ctx.fill();
			ctx.font = "10px";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(node.item, node.path.x, node.path.y);			
			console.log("%c {" + node.item + ", " + node.path.x + ", " + node.path.y + ", "+ node.visited +"}", "color: black");
			await sleep(1000);
			if(node.left != null){
				queue.enqueue(node.left);
			}
			if(node.right != null){
				queue.enqueue(node.right);
			}
		}
		$('.dropdown-item').toggleClass("disabled");
		ctx.closePath();
	}

	async function postorder(root){
		if(root == null)
				return;
		$('.dropdown-item').toggleClass("disabled");
		$('.postorder').show();
		let stack = new Stack();
		stack.push(root);
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.arc(root.path.x,root.path.y,20,0,Math.PI*2,true);
		ctx.fill();
		ctx.font = "10px";
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(root.item, root.path.x, root.path.y);
		await sleep(1000);
		while(!stack.isEmpty()){
			let node = stack.peek();
			while(node.left != null && !node.left.visited){
				stack.push(node.left);
				node = node.left;
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.item, node.path.x, node.path.y);
				await sleep(1000);
			}

			if(node.right != null && !node.right.visited){
				stack.push(node.right);
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.arc(node.right.path.x,node.right.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.right.item, node.right.path.x, node.right.path.y);
				await sleep(1000);
			}else{
				node.visited = true;
				node = stack.pop();
				ctx.beginPath();
				ctx.fillStyle = "#478559";
				ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.item, node.path.x, node.path.y);
				var output = document.getElementById("result");
				output.insertAdjacentHTML('beforeend', node.item + " ");
				await sleep(1000);
				console.log(node.item);
			}
		}
		ctx.closePath();
		$('.dropdown-item').toggleClass("disabled");
	}

	async function inorder(root){
		if(root == null)
			return;
		$('.inorder').show();
		$('.dropdown-item').toggleClass("disabled");
		stack = new Stack();
		stack.push(root);
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.arc(root.path.x,root.path.y,20,0,Math.PI*2,true);
		ctx.fill();
		ctx.font = "10px";
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(root.item, root.path.x, root.path.y);
		await sleep(1000);
		while(!stack.isEmpty()){
			let node = stack.peek();
			while(node.left != null){
				stack.push(node.left);
				node = node.left;
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.item, node.path.x, node.path.y);
				await sleep(1000);
			}
			node = stack.pop();
			while(node.right == null && !stack.isEmpty()){
				ctx.beginPath();
				ctx.fillStyle = "#478559";
				ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.item, node.path.x, node.path.y);
				var output = document.getElementById("result");
				output.insertAdjacentHTML('beforeend', node.item + " ");
				console.log(node.item);
				node = stack.pop();
				await sleep(1000);
			}
			ctx.beginPath();
			ctx.fillStyle = "#478559";
			ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
			ctx.fill();
			ctx.font = "10px";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(node.item, node.path.x, node.path.y);
			var output = document.getElementById("result");
			output.insertAdjacentHTML('beforeend', node.item + " ");
			await sleep(1000);
			if(node.right != null){
				stack.push(node.right);
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.arc(node.right.path.x,node.right.path.y,20,0,Math.PI*2,true);
				ctx.fill();
				ctx.font = "10px";
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(node.right.item, node.right.path.x, node.right.path.y);
				await sleep(1000);
			}
		}
		ctx.closePath();
		$('.dropdown-item').toggleClass("disabled");
	}

	async function preorder(root){
		if(root == null)
			return;
		stack = new Stack();
		stack.push(root);
		$('.preorder').show();
		$('.dropdown-item').toggleClass("disabled");
		while(!stack.isEmpty()){
			let node = stack.pop();
			ctx.beginPath();
			ctx.fillStyle = "#478559";
			ctx.arc(node.path.x,node.path.y,20,0,Math.PI*2,true);
			ctx.fill();
			ctx.font = "10px";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(node.item, node.path.x, node.path.y);
			var output = document.getElementById("result");
			output.insertAdjacentHTML('beforeend', node.item + " ");
			await sleep(900);

			if(node.right != null){
				stack.push(node.right);
			}
			if(node.left != null){
				stack.push(node.left);
			}
		}
		ctx.closePath();
		$('.dropdown-item').toggleClass("disabled");
	}


	/*******************************/


	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	
	$('.inorder').hide();
	$('.preorder').hide();
	$('.postorder').hide();
	
	/***************************************/
	  
	$('.dropdown-item').on('click',function(){
		var selectedOption = $(this).text();
		switch(selectedOption){
			case "Inorder":{
				$('.preorder').hide();
				$('.postorder').hide();

				drawTree(tree);
				$('#result').html("Tree traversal inoder: ");
				inorder(tree.root);
				break;
			}
			case "Preorder":{
				$('.inorder').hide();
				$('.postorder').hide();
				drawTree(tree);
				$('#result').html("Tree traversal preorder: ");
				preorder(tree.root);
				break;
			}
			case "Postorder":{
				$('.inorder').hide();
				$('.preorder').hide();
				drawTree(tree);
				$('#result').html("Tree traversal postorder: ");
				postorder(tree.root);
				resetVisitedNodes(tree.root);
				break;
			}
			case "Breadth-First Search":{
				$('.inorder').hide();
				$('.preorder').hide();
				$('.postorder').hide();
				drawTree(tree);
				$('#result').html("Tree traversal breadth first search: ");
				breadthFirstSearch(tree.root);
				break;
			}
			default: {
				console.log("Invalid choice");
				break;
			}

		}
	});
});
package br.com.ivanfsilva.bookstore.resources;

import br.com.ivanfsilva.bookstore.domain.Livro;
import br.com.ivanfsilva.bookstore.dtos.LivroDTO;
import br.com.ivanfsilva.bookstore.service.LivroService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/livros")
public class LivroResource {

    @Autowired
    LivroService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Livro> findById(@PathVariable Integer id) {
        Livro obj = service.findById(id);

        return ResponseEntity.ok().body(obj);
    }

    @GetMapping
    public ResponseEntity< List<LivroDTO> > findAll(@RequestParam( value = "categoria", defaultValue = "0" ) Integer idCat) {
        List<Livro> list = service.findAll( idCat );
        List<LivroDTO> listDTO = list.stream().map(obj -> new LivroDTO(obj)).collect(Collectors.toList());

        return ResponseEntity.ok().body(listDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Livro> update(@PathVariable Integer id, @RequestBody Livro obj) {
        Livro newObj = service.update(id, obj);

        return ResponseEntity.ok().body(newObj);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Livro> updatePath(@PathVariable Integer id, @RequestBody Livro obj) {
        Livro newObj = service.update(id, obj);

        return ResponseEntity.ok().body(newObj);
    }
}
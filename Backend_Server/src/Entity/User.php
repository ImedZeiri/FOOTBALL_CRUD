<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource()
 * @ORM\HasLifecycleCallbacks()
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var string|null Non persisté, utilisé pour hacher le mot de passe
     */
    private $plainPassword;

    /**
     * Constructeur pour initialiser les rôles avec ROLE_USER par défaut
     */
    public function __construct()
    {
        $this->roles = ['ROLE_USER']; // Ajoute automatiquement ROLE_USER
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        // Ajoute ROLE_USER si ce n'est pas déjà présent dans les rôles
        if (!in_array('ROLE_USER', $roles, true)) {
            $roles[] = 'ROLE_USER';
        }

        $this->roles = array_unique($roles);
        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    /**
     * Retourne le mot de passe en clair (utilisé lors de la création ou modification de l'utilisateur)
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * Définit le mot de passe en clair (utilisé pour l'enregistrement du mot de passe haché)
     */
    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * Encode le mot de passe avant de le persister en base
     *
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function encodePassword(): void
    {
        if ($this->plainPassword) {
            $this->password = password_hash($this->plainPassword, PASSWORD_DEFAULT);
            $this->plainPassword = null; // Efface le mot de passe en clair après hachage
        }
    }

    /**
     * Retourne null si un sel n'est pas nécessaire (utilisation de bcrypt ou sodium)
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * Efface les informations sensibles du mot de passe en clair
     */
    public function eraseCredentials()
    {
        $this->plainPassword = null;
    }
}
